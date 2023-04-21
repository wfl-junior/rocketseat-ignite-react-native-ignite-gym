import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

export interface InputProps extends IInputProps {
  errorMessage?: string;
  variant?: "primary" | "secondary";
}

export const Input: React.FC<InputProps> = ({
  errorMessage,
  variant = "primary",
  isInvalid: _isInvalid,
  ...props
}) => {
  const isInvalid = Boolean(errorMessage) || _isInvalid;

  return (
    <FormControl isInvalid={isInvalid} mb={4}>
      <NativeBaseInput
        h={14}
        px={4}
        fontSize="md"
        color="white"
        borderWidth={2}
        fontFamily="body"
        placeholderTextColor="gray.300"
        bg={variant === "primary" ? "gray.700" : "gray.600"}
        borderColor={
          errorMessage
            ? "red.500"
            : variant === "primary"
            ? "gray.700"
            : "gray.600"
        }
        _focus={{
          bg: variant === "primary" ? "gray.700" : "gray.600",
          borderColor: "green.500",
        }}
        {...props}
      />

      <FormControl.ErrorMessage mt={1}>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};
