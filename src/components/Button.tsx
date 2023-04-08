import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "solid" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "solid",
  ...props
}) => (
  <NativeBaseButton
    h={14}
    w="full"
    rounded="sm"
    borderColor="green.500"
    borderWidth={variant === "outline" ? 1 : 0}
    bg={variant === "outline" ? "transparent" : "green.700"}
    _pressed={{
      borderColor: variant === "outline" ? "green.700" : undefined,
      bg: variant === "outline" ? "gray.500" : "green.500",
    }}
    {...props}
  >
    <Text
      fontSize="sm"
      fontFamily="heading"
      color={variant === "outline" ? "green.500" : "white"}
    >
      {title}
    </Text>
  </NativeBaseButton>
);
