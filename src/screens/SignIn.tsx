import { Center, Heading, Image, Text, VStack } from "native-base";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => (
  <VStack flex={1} bg="gray.700" px={10}>
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

      <Input
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input placeholder="Senha" secureTextEntry autoCapitalize="none" />
      <Button title="Acessar" />
    </Center>

    <Center mt="auto">
      <Text color="gray.100">Ainda não tem acesso?</Text>
      <Button title="Criar conta" variant="outline" />
    </Center>
  </VStack>
);
