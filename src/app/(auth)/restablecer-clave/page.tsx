import Link from "next/link";

import { APP_LINKS } from "@/lib/constants";

import { buttonVariants } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

import { FormResetPassword } from "./form-reset-password";

export default function ResetPasswordPage() {
  return (
    <>
      <TypographyH1>Nueva Contraseña</TypographyH1>
      <FormResetPassword />
      <div className="flex justify-center">
        <Link href={APP_LINKS.FORGOT_PASSWORD_PAGE} className={buttonVariants({ variant: "link" })}>
          Ir a recuperar contraseña
        </Link>
      </div>
    </>
  );
}
