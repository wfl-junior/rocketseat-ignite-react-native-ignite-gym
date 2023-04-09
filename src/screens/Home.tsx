import { HStack, VStack } from "native-base";
import { Group } from "~/components/Group";
import { HomeHeader } from "~/components/HomeHeader";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => (
  <VStack flex={1}>
    <HomeHeader />

    <HStack>
      <Group name="Costas" />
      <Group name="Ombro" />
    </HStack>
  </VStack>
);
