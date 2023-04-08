import { Image, VStack } from "native-base";
import backgroundImage from "~/assets/background.png";

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => (
  <VStack flex={1} backgroundColor="gray.700">
    <Image
      position="absolute"
      resizeMode="contain"
      source={backgroundImage}
      alt="Pessoas treinando em uma academia"
    />
  </VStack>
);
