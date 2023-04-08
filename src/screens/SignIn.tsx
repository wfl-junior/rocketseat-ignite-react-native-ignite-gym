import { Center, Heading, Image, Text, VStack } from "native-base";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Input } from "~/components/Input";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => (
  <VStack flex={1} bg="gray.700">
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

    <Center px={10}>
      <Heading color="gray.100" fontSize="xl" mb={6}>
        Acesse sua conta
      </Heading>

      <Input placeholder="E-mail" />
      <Input placeholder="Senha" />
    </Center>
  </VStack>
);
