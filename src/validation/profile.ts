import * as yup from "yup";

export const profileValidationSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  currentPassword: yup.string().when(["newPassword"], ([newPassword]) => {
    if (newPassword) {
      return yup
        .string()
        .required("A senha atual é obrigatória para alterar a senha");
    }

    return yup.string();
  }),
  newPassword: yup
    .string()
    .optional()
    .min(8, "A senha deve conter no mínimo ${min} caracteres")
    .transform(newPassword => newPassword || undefined),
  newPasswordConfirmation: yup
    .string()
    .transform(newPasswordConfirmation => newPasswordConfirmation || undefined)
    .oneOf([yup.ref("newPassword")], "A confirmação da senha está incorreta"),
});

export type ProfileFormData = yup.InferType<typeof profileValidationSchema>;
