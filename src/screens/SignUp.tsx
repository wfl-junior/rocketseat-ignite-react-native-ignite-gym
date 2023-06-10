import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/Button";
import { InputControlled } from "~/components/InputControlled";
import { useAuthStackNavigation } from "~/hooks/useAuthStackNavigation";
import { api } from "~/lib/api";
import { SignUpFormData, signUpValidationSchema } from "~/validation/sign-up";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const { goBack } = useAuthStackNavigation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSignUp = handleSubmit(async values => {
    try {
      await api.post("/users", values);
    } catch (error) {
      if (error instanceof AxiosError) {
        return Alert.alert(
          "Erro",
          error.response?.data.message ?? error.message,
        );
      }

      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} px={10} pb={12}>
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
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
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
            returnKeyType="send"
            autoCapitalize="none"
            name="passwordConfirmation"
            placeholder="Confirme a Senha"
            onSubmitEditing={handleSignUp}
          />

          <Button
            variant="solid"
            onPress={handleSignUp}
            title="Criar e acessar"
            isLoading={isSubmitting}
          />
        </Center>

        <Button
          mt={12}
          onPress={goBack}
          variant="outline"
          title="Voltar para o login"
        />
      </VStack>
    </ScrollView>
  );
};
