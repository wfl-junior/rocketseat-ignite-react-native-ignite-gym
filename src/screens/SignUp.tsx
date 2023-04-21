import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useState } from "react";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { useAuthStackNavigation } from "~/hooks/useAuthStackNavigation";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { goBack } = useAuthStackNavigation();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSignUp() {
    console.log({
      name,
      email,
      password,
      passwordConfirmation,
    });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} px={10} pb={16}>
        <Image
          position="absolute"
          resizeMode="contain"
          source={backgroundImage}
          defaultSource={backgroundImage}
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
            Crie sua conta
          </Heading>

          <Input
            value={name}
            placeholder="Nome"
            autoCapitalize="words"
            onChangeText={setName}
          />

          <Input
            value={email}
            placeholder="E-mail"
            autoCapitalize="none"
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            secureTextEntry
            value={password}
            placeholder="Senha"
            autoCapitalize="none"
            onChangeText={setPassword}
          />

          <Input
            secureTextEntry
            autoCapitalize="none"
            value={passwordConfirmation}
            placeholder="Confirme a Senha"
            onChangeText={setPasswordConfirmation}
          />

          <Button
            variant="solid"
            onPress={handleSignUp}
            title="Criar e acessar"
          />
        </Center>

        <Button
          mt={16}
          onPress={goBack}
          variant="outline"
          title="Voltar para o login"
        />
      </VStack>
    </ScrollView>
  );
};
