import { VStack } from "native-base";
import { HomeHeader } from "~/components/HomeHeader";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => (
  <VStack flex={1}>
    <HomeHeader />
  </VStack>
);
