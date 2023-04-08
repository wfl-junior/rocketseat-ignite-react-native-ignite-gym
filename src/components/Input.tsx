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
    borderWidth={0}
    fontFamily="body"
    placeholderTextColor="gray.300"
    {...props}
  />
);
