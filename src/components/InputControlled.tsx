import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { Input, InputProps } from "./Input";

interface InputControlledProps<T extends FieldValues>
  extends Omit<InputProps, "value" | "onChangeText"> {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export const InputControlled = <T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: InputControlledProps<T>): JSX.Element => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
  });

  return <Input {...props} value={value} onChangeText={onChange} />;
};
