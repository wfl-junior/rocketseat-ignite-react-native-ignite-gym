import { Center, Heading } from "native-base";

interface ScreenHeaderProps {
  title: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => (
  <Center bg="gray.600" pt={16} pb={5} px={8}>
    <Heading color="gray.100" fontSize="xl">
      {title}
    </Heading>
  </Center>
);
