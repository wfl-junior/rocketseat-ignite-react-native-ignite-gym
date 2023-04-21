import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve conter no mínimo ${min} caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "A confirmação da senha está incorreta"),
});

export type SignUpFormData = yup.InferType<typeof signUpValidationSchema>;
