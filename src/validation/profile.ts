import * as yup from "yup";

export const profileValidationSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  currentPassword: yup.string().when(["newPassword"], ([newPassword]) => {
    if (!newPassword) {
      return yup.string().optional();
    }

    return yup
      .string()
      .required("A senha atual é obrigatória para alterar a senha");
  }),
  newPassword: yup
    .string()
    .optional()
    .min(8, "A senha deve conter no mínimo ${min} caracteres")
    .transform(newPassword => newPassword || undefined),
  newPasswordConfirmation: yup
    .string()
    .test(
      "is-matching-new-password",
      "A confirmação da senha está incorreta",
      (value, { parent: { newPassword } }) => {
        if (!newPassword) {
          return true;
        }

        return value === newPassword;
      },
    ),
});

export type ProfileFormData = yup.InferType<typeof profileValidationSchema>;
