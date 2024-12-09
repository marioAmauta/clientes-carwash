"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { APP_LINKS, SUCCESS_MESSAGES, TEST_IDS } from "@/lib/constants";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

import { FormForgotPassword } from "./form-forgot-password";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <>
        <TypographyH1>Revisa tu email</TypographyH1>
        <section className="flex flex-col items-center space-y-8 lg:space-y-12">
          <Alert className="w-fit">
            <CheckCircle2 className="size-5" />
            <AlertTitle>{SUCCESS_MESSAGES.RESET_PASSWORD_EMAIL_SENT}</AlertTitle>
            <AlertDescription>Si no ves el correo electrónico, revisa tu carpeta de spam.</AlertDescription>
          </Alert>
          <Button
            variant="link"
            onClick={() => setIsSubmitted(false)}
            data-testid={TEST_IDS.backToForgotPasswordButton}
          >
            Volver a recuperar contraseña
          </Button>
        </section>
      </>
    );
  }

  return (
    <>
      <TypographyH1>Recuperar Contraseña</TypographyH1>
      <FormForgotPassword setIsSubmitted={setIsSubmitted} />
      <div className="flex justify-center">
        <Link href={APP_LINKS.LOGIN_PAGE} className={buttonVariants({ variant: "link" })}>
          Volver a inicio de sesión
        </Link>
      </div>
    </>
  );
}
