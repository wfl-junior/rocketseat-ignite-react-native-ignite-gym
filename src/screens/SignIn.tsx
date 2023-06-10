import { yupResolver } from "@hookform/resolvers/yup";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useForm } from "react-hook-form";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/Button";
import { InputControlled } from "~/components/InputControlled";
import { useAuthContext } from "~/contexts/AuthContext";
import { useAuthStackNavigation } from "~/hooks/useAuthStackNavigation";
import { AppError } from "~/utils/AppError";
import { SignInFormData, signInValidationSchema } from "~/validation/sign-in";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => {
  const toast = useToast();
  const { signIn } = useAuthContext();
  const { navigate } = useAuthStackNavigation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInValidationSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = handleSubmit(async values => {
    try {
      await signIn(values);
    } catch (error) {
      let errorMessage = "Não foi possível acessar.";

      if (error instanceof AppError) {
        errorMessage = error.message;
      }

      toast.show({
        duration: 5000,
        placement: "top",
        bgColor: "red.600",
        title: errorMessage,
        id: "sign-in-error",
      });
    }
  });

  function handleCreateAccount() {
    navigate("signUp");
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
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

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
            returnKeyType="send"
            autoCapitalize="none"
            onSubmitEditing={handleSignIn}
          />

          <Button
            title="Acessar"
            variant="solid"
            onPress={handleSignIn}
            isLoading={isSubmitting}
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3}>
            Ainda não tem acesso?
          </Text>

          <Button
            variant="outline"
            title="Criar conta"
            onPress={handleCreateAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};
