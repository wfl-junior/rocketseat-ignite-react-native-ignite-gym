import { Center, Spinner } from "native-base";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => (
  <Center flex={1} backgroundColor="gray.700">
    <Spinner size="lg" color="green.500" />
  </Center>
);
