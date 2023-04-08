import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <VStack flex={1} px={10} pb={16}>
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
        <Button variant="solid" title="Acessar" />
      </Center>

      <Center mt={24}>
        <Text color="gray.100" fontSize="sm" mb={3}>
          Ainda não tem acesso?
        </Text>

        <Button variant="outline" title="Criar conta" />
      </Center>
    </VStack>
  </ScrollView>
);
