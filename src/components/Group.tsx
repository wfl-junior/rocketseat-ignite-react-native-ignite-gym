import { Heading, IPressableProps, Pressable } from "native-base";

interface GroupProps extends IPressableProps {
  name: string;
}

export const Group: React.FC<GroupProps> = ({ name, ...props }) => (
  <Pressable
    mr={3}
    w={24}
    h={10}
    rounded="md"
    bg="gray.600"
    overflow="hidden"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <Heading color="gray.200" textTransform="uppercase" fontSize="xs">
      {name}
    </Heading>
  </Pressable>
);
