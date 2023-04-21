import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useForm } from "react-hook-form";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/Button";
import { InputControlled } from "~/components/InputControlled";
import { useAuthStackNavigation } from "~/hooks/useAuthStackNavigation";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const { goBack } = useAuthStackNavigation();
  const { control } = useForm();

  function handleSignUp() {}

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

          <InputControlled
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="words"
          />

          <InputControlled
            name="email"
            control={control}
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <InputControlled
            name="password"
            secureTextEntry
            control={control}
            placeholder="Senha"
            autoCapitalize="none"
          />

          <InputControlled
            secureTextEntry
            control={control}
            autoCapitalize="none"
            name="passwordConfirmation"
            placeholder="Confirme a Senha"
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
