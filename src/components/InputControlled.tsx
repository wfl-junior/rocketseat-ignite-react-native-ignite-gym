import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Input, InputProps } from "./Input";

interface InputControlledProps<T extends FieldValues>
  extends Omit<InputProps, "value" | "onChangeText"> {
  name: Path<T>;
  control: Control<T>;
}

export const InputControlled = <T extends FieldValues>({
  name,
  control,
  ...props
}: InputControlledProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Input
      {...props}
      value={value}
      onChangeText={onChange}
      errorMessage={error?.message}
    />
  );
};
