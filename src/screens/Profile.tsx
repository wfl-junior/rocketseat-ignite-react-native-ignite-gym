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
import { Input } from "~/components/Input";
import { InputControlled } from "~/components/InputControlled";
import { ScreenHeader } from "~/components/ScreenHeader";
import { UserPhoto } from "~/components/UserPhoto";
import { useAuthContext } from "~/contexts/AuthContext";
import { ProfileFormData, profileValidationSchema } from "~/validation/profile";

const photoSize = 33;

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const toast = useToast();
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/wfl-junior.png",
  );

  const { user } = useAuthContext();
  const {
    control,
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
        photoInfo.size / Math.pow(1024, 2) > 5 /* 5MB */
      ) {
        return toast.show({
          placement: "top",
          bgColor: "red.600",
          id: "image-picker-error",
          title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
        });
      }

      setUserPhoto(asset.uri);
    } catch (error) {
      console.error(error);

      toast.show({
        placement: "top",
        bgColor: "red.600",
        id: "image-picker-error",
        title: "Ocorreu um erro inesperado.",
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
            <UserPhoto
              size={photoSize}
              alt="Foto do usuário"
              source={{ uri: userPhoto }}
            />
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

          <Input
            secureTextEntry
            variant="secondary"
            autoCapitalize="none"
            placeholder="Senha antiga"
          />

          <Input
            secureTextEntry
            variant="secondary"
            autoCapitalize="none"
            placeholder="Nova senha"
          />

          <Input
            secureTextEntry
            variant="secondary"
            autoCapitalize="none"
            placeholder="Confirme a nova senha"
          />

          <Button title="Atualizar" mt={4} isLoading={isSubmitting} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
