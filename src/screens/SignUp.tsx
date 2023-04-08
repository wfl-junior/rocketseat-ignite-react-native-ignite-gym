import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import backgroundImage from "~/assets/background.png";
import Logo from "~/assets/logo.svg";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { useAuthStackNavigation } from "~/hooks/useAuthStackNavigation";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const { goBack } = useAuthStackNavigation();

  return (
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
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" autoCapitalize="words" />

          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input placeholder="Senha" secureTextEntry autoCapitalize="none" />

          <Input
            placeholder="Confirme a Senha"
            secureTextEntry
            autoCapitalize="none"
          />

          <Button variant="solid" title="Criar e acessar" />
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
