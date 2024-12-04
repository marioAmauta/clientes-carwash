import { FormResetPassword } from "@/components/form-reset-password";
import { TypographyH1 } from "@/components/ui/typography";

export default function ResetPasswordPage() {
  return (
    <>
      <TypographyH1>Nueva Contraseña</TypographyH1>
      <FormResetPassword />
    </>
  );
}
