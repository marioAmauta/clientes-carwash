import { Metadata } from "next";
import Link from "next/link";

import { verifyUserLoggedOut } from "@/data-access/auth-check";

import { TEST_IDS, APP_LINKS } from "@/lib/constants";

import { MessageWithLink } from "@/components/message-with-link";
import { buttonVariants } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

import { FormLogin } from "./form-login";

const title = "Iniciar sesión";

export const metadata: Metadata = {
  title
};

export default async function LoginPage() {
  await verifyUserLoggedOut();

  return (
    <>
      <TypographyH1>{title}</TypographyH1>
      <FormLogin />
      <div className="grid justify-center">
        <Link
          href={APP_LINKS.FORGOT_PASSWORD_PAGE}
          className={buttonVariants({ variant: "link" })}
          data-testid={TEST_IDS.forgotPasswordPageLink}
        >
          Recuperar contraseña
        </Link>
        <MessageWithLink
          href={APP_LINKS.CREATE_ACCOUNT_PAGE}
          linkTestId={TEST_IDS.createAccountLink}
          linkLabel="Crear cuenta"
          messageText="¿No tienes una cuenta?"
        />
      </div>
    </>
  );
}
