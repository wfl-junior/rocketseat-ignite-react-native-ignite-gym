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
        isInvalid={isInvalid}
        placeholderTextColor="gray.300"
        _invalid={{ borderColor: "red.500" }}
        bg={variant === "primary" ? "gray.700" : "gray.600"}
        borderColor={variant === "primary" ? "gray.700" : "gray.600"}
        _focus={{
          bg: variant === "primary" ? "gray.700" : "gray.600",
          borderColor: "green.500",
        }}
        {...props}
      />

      <FormControl.ErrorMessage
        mt={1}
        _text={{
          color: "red.500",
          fontSize: "sm",
        }}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
