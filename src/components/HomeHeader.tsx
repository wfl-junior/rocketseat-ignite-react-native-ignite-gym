import { HStack, Heading, Text, VStack } from "native-base";

interface HomeHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = () => (
  <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
    <VStack ml={1}>
      <Text color="gray.100" fontSize="md">
        Olá,
      </Text>

      <Heading color="gray.100" fontSize="md">
        Wallace Júnior
      </Heading>
    </VStack>
  </HStack>
);
