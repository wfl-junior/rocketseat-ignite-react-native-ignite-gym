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
    borderWidth={1}
    overflow="hidden"
    alignItems="center"
    borderColor="gray.600"
    justifyContent="center"
    _pressed={{ borderColor: "green.500" }}
    {...props}
  >
    <Heading color="gray.200" textTransform="uppercase" fontSize="xs">
      {name}
    </Heading>
  </Pressable>
);
