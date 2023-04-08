import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => (
  <NativeBaseButton
    h={14}
    w="full"
    rounded="sm"
    bg="green.700"
    _pressed={{ bg: "green.500" }}
    {...props}
  >
    <Text color="white" fontSize="sm" fontFamily="heading">
      {title}
    </Text>
  </NativeBaseButton>
);
