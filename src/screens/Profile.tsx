import { Center, ScrollView, VStack } from "native-base";
import { ScreenHeader } from "~/components/ScreenHeader";
import { UserPhoto } from "~/components/UserPhoto";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => (
  <VStack flex={1}>
    <ScreenHeader title="Perfil" />

    <ScrollView>
      <Center mt={6} px={10}>
        <UserPhoto
          size={33}
          alt="Foto do usuário"
          source={{ uri: "https://github.com/wfl-junior.png" }}
        />
      </Center>
    </ScrollView>
  </VStack>
);
