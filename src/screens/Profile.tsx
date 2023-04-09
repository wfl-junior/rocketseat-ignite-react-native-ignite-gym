import * as ImagePicker from "expo-image-picker";
import { Center, Heading, ScrollView, Skeleton, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { ScreenHeader } from "~/components/ScreenHeader";
import { UserPhoto } from "~/components/UserPhoto";

const photoSize = 33;

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/wfl-junior.png",
  );

  async function handleSelectPhoto() {
    const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (selectedPhoto.canceled) return;
    setUserPhoto(selectedPhoto.assets[0].uri);
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
            <Heading color="green.500" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Heading>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            variant="secondary"
            autoCapitalize="words"
          />

          <Input
            isDisabled
            variant="secondary"
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Center>

        <VStack px={10} mt={12}>
          <Heading color="gray.200" fontSize="md" mb={2}>
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

          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};
