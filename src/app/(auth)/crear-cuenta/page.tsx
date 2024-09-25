import { Metadata } from "next";

import { verifyUserLoggedOut } from "@/data-access/auth-check";

import { TEST_IDS, APP_LINKS } from "@/lib/constants";

import { MessageWithLink } from "@/components/message-with-link";
import { TypographyH1 } from "@/components/ui/typography";

import { FormRegister } from "./form-register";

const title = "Crear cuenta";

export const metadata: Metadata = {
  title
};

export default async function CreateAccountPage() {
  await verifyUserLoggedOut();

  return (
    <>
      <TypographyH1>{title}</TypographyH1>
      <FormRegister />
      <MessageWithLink
        href={APP_LINKS.LOGIN_PAGE}
        linkTestId={TEST_IDS.loginLink}
        linkLabel="Iniciar sesión"
        messageText="¿Ya tienes una cuenta?"
      />
    </>
  );
}
