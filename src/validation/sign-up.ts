import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha"),
  passwordConfirmation: yup.string().required("Confirme a senha"),
});

export type SignUpFormData = yup.InferType<typeof signUpValidationSchema>;
