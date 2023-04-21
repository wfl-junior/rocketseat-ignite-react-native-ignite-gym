import { IInputProps, Input as NativeBaseInput } from "native-base";

export interface InputProps extends IInputProps {
  variant?: "primary" | "secondary";
}

export const Input: React.FC<InputProps> = ({
  variant = "primary",
  ...props
}) => (
  <NativeBaseInput
    h={14}
    px={4}
    mb={4}
    fontSize="md"
    color="white"
    borderWidth={2}
    fontFamily="body"
    placeholderTextColor="gray.300"
    bg={variant === "primary" ? "gray.700" : "gray.600"}
    borderColor={variant === "primary" ? "gray.700" : "gray.600"}
    _focus={{
      bg: variant === "primary" ? "gray.700" : "gray.600",
      borderColor: "green.500",
    }}
    {...props}
  />
);
