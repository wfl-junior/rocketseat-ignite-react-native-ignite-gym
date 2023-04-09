import { Heading } from "native-base";

interface GroupProps {
  name: string;
}

export const Group: React.FC<GroupProps> = ({ name }) => (
  <Heading color="gray.200" textTransform="uppercase" fontSize="xs">
    {name}
  </Heading>
);
