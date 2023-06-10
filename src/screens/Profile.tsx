import { yupResolver } from "@hookform/resolvers/yup";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  VStack,
  useToast,
} from "native-base";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Button } from "~/components/Button";
import { InputControlled } from "~/components/InputControlled";
import { ScreenHeader } from "~/components/ScreenHeader";
import { UserPhoto } from "~/components/UserPhoto";
import { useAuthContext } from "~/contexts/AuthContext";
import { api } from "~/lib/api";
import { storage } from "~/lib/storage";
import { AppError } from "~/utils/AppError";
import { STORAGE_KEYS } from "~/utils/constants";
import { ProfileFormData, profileValidationSchema } from "~/validation/profile";

const photoSize = 33;
const imageMimeTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  bmp: "image/bmp",
  ico: "image/vnd.microsoft.icon",
  tiff: "image/tiff",
  tif: "image/tiff",
};

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const toast = useToast();
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  const { user } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
        }
      : {
          name: "",
          email: "",
        },
  });

  const handleUpdateProfile = handleSubmit(async values => {
    try {
      await api.put("/users", {
        name: values.name,
        password: values.newPassword,
        old_password: values.currentPassword,
      });

      storage.set(
        STORAGE_KEYS.user,
        JSON.stringify({
          ...user,
          name: values.name,
        }),
      );

      toast.show({
        placement: "top",
        bgColor: "green.700",
        id: "update-profile",
        title: "Perfil atualizado com sucesso!",
      });
    } catch (error) {
      let errorMessage = "Não foi possível atualizar o perfil.";

      if (error instanceof AppError) {
        errorMessage = error.message;
      }

      toast.show({
        placement: "top",
        bgColor: "red.600",
        title: errorMessage,
        id: "update-profile",
      });
    }
  });

  async function handleSelectPhoto() {
    setIsPhotoLoading(true);

    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (selectedPhoto.canceled) return;
      const asset = selectedPhoto.assets.at(0);
      if (!asset) return;
      const photoInfo = await FileSystem.getInfoAsync(asset.uri);

      if (
        photoInfo.exists &&
        photoInfo.size / Math.pow(1024, 2) > 5 /* 5MiB */
      ) {
        return toast.show({
          placement: "top",
          id: "image-picker",
          bgColor: "red.600",
          title: "Essa imagem é muito grande. Escolha uma de até 5MiB.",
        });
      }

      const extension = asset.uri.split(".").pop()!;
      const formData = new FormData();
      formData.append("avatar", {
        name: `${user?.id}.${extension}`,
        uri: asset.uri,
        type: imageMimeTypes[extension as keyof typeof imageMimeTypes],
      } as any);

      const { data } = await api.patchForm<{ avatar: string }>(
        "/users/avatar",
        formData,
      );

      storage.set(
        STORAGE_KEYS.user,
        JSON.stringify({
          ...user,
          avatar: data.avatar,
        }),
      );

      toast.show({
        placement: "top",
        id: "image-picker",
        bgColor: "green.700",
        title: "Foto atualizada com sucesso!",
      });
    } catch (error) {
      let errorMessage = "Não foi possível atualizar a foto.";

      if (error instanceof AppError) {
        errorMessage = error.message;
      }

      toast.show({
        placement: "top",
        id: "image-picker",
        bgColor: "red.600",
        title: errorMessage,
      });
    } finally {
      setIsPhotoLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView _contentContainerStyle={{ pb: 9 }}>
        <Center mt={6} px={10}>
          {isPhotoLoading ? (
            <Skeleton
              w={photoSize}
              h={photoSize}
              rounded="full"
              endColor="gray.600"
              startColor="gray.400"
            />
          ) : (
            <UserPhoto size={photoSize} />
          )}

          <TouchableOpacity activeOpacity={0.6} onPress={handleSelectPhoto}>
            <Heading
              mt={2}
              mb={8}
              fontSize="md"
              color="green.500"
              fontFamily="heading"
            >
              Alterar foto
            </Heading>
          </TouchableOpacity>

          <InputControlled
            name="name"
            control={control}
            placeholder="Nome"
            variant="secondary"
            autoCapitalize="words"
          />

          <InputControlled
            isDisabled
            name="email"
            control={control}
            variant="secondary"
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Center>

        <VStack px={10} mt={12}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>

          <InputControlled
            secureTextEntry
            control={control}
            variant="secondary"
            autoCapitalize="none"
            name="currentPassword"
            placeholder="Senha atual"
          />

          <InputControlled
            secureTextEntry
            control={control}
            name="newPassword"
            variant="secondary"
            autoCapitalize="none"
            placeholder="Nova senha"
          />

          <InputControlled
            secureTextEntry
            control={control}
            variant="secondary"
            returnKeyType="send"
            autoCapitalize="none"
            name="newPasswordConfirmation"
            placeholder="Confirme a nova senha"
            onSubmitEditing={handleUpdateProfile}
          />

          <Button
            mt={4}
            title="Atualizar"
            isLoading={isSubmitting}
            onPress={handleUpdateProfile}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
