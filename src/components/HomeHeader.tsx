import { HStack, Heading, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";

interface HomeHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = () => (
  <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
    <UserPhoto
      mr={4}
      size={16}
      alt="Imagem do usuário"
      source={{ uri: "https://github.com/wfl-junior.png" }}
    />

    <VStack>
      <Text color="gray.100" fontSize="md">
        Olá,
      </Text>

      <Heading color="gray.100" fontSize="md">
        Wallace Júnior
      </Heading>
    </VStack>
  </HStack>
);
