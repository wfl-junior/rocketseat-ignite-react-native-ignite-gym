import { Center, ScrollView, Skeleton, VStack } from "native-base";
import { useState } from "react";
import { ScreenHeader } from "~/components/ScreenHeader";
import { UserPhoto } from "~/components/UserPhoto";

const photoSize = 33;

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
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
              source={{ uri: "https://github.com/wfl-junior.png" }}
            />
          )}
        </Center>
      </ScrollView>
    </VStack>
  );
};
