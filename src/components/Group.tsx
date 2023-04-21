import { Heading, IPressableProps, Pressable } from "native-base";

interface GroupProps extends IPressableProps {
  name: string;
  isActive?: boolean;
}

export const Group: React.FC<GroupProps> = ({
  name,
  isActive = false,
  ...props
}) => (
  <Pressable
    mr={3}
    w={24}
    h={10}
    rounded="md"
    bg="gray.600"
    borderWidth={1}
    overflow="hidden"
    alignItems="center"
    isPressed={isActive}
    borderColor="gray.600"
    justifyContent="center"
    _pressed={{ borderColor: "green.500" }}
    {...props}
  >
    <Heading
      fontSize="xs"
      fontFamily="heading"
      textTransform="uppercase"
      color={isActive ? "green.500" : "gray.200"}
    >
      {name}
    </Heading>
  </Pressable>
);
