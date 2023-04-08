import { Center, Text } from "native-base";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => (
  <Center flex={1}>
    <Text color="white">Home</Text>
  </Center>
);
