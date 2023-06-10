import * as yup from "yup";

export const profileValidationSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
});

export type ProfileFormData = yup.InferType<typeof profileValidationSchema>;
