import { VStack } from "native-base";
import { ScreenHeader } from "~/components/ScreenHeader";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => (
  <VStack flex={1}>
    <ScreenHeader title="Perfil" />
  </VStack>
);
