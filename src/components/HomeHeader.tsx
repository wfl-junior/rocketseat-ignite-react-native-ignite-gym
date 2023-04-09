import { HStack, Heading, Text, VStack } from "native-base";

interface HomeHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = () => (
  <HStack>
    <VStack ml={1}>
      <Text color="gray.100">Olá,</Text>
      <Heading color="gray.100">Wallace Júnior</Heading>
    </VStack>
  </HStack>
);
