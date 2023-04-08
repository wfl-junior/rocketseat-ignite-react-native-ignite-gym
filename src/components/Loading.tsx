import { Center, Spinner } from "native-base";

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => (
  <Center flex={1}>
    <Spinner size="lg" />
  </Center>
);
