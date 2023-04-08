import { IInputProps, Input as NativeBaseInput } from "native-base";

interface InputProps extends IInputProps {}

export const Input: React.FC<InputProps> = props => (
  <NativeBaseInput
    h={14}
    px={4}
    mb={4}
    bg="gray.700"
    fontSize="md"
    color="white"
    borderWidth={2}
    fontFamily="body"
    borderColor="gray.700"
    placeholderTextColor="gray.300"
    _focus={{
      bg: "gray.700",
      borderColor: "green.500",
    }}
    {...props}
  />
);
