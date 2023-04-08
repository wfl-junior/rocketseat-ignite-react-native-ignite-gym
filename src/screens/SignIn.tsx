import { Center, Heading, Image, Text, VStack } from "native-base";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => (
  <VStack flex={1} backgroundColor="gray.700">
    <Image
      position="absolute"
      resizeMode="contain"
      source={backgroundImage}
      alt="Pessoas treinando em uma academia"
    />

    <Center my={24}>
      <Logo />

      <Text color="gray.100" fontSize="sm">
        Treine sua mente e o seu corpo
      </Text>
    </Center>

    <Center>
      <Heading color="gray.100" fontSize="xl" mb={6}>
        Acesse sua conta
      </Heading>
    </Center>
  </VStack>
);
