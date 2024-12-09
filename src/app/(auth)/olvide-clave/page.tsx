"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { APP_LINKS, SUCCESS_MESSAGES, TEST_IDS } from "@/lib/constants";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

import { FormForgotPassword } from "./form-forgot-password";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <>
        <TypographyH1>Revisa tu email</TypographyH1>
        <TypographyP className="text-center">{SUCCESS_MESSAGES.RESET_PASSWORD_EMAIL_SENT}</TypographyP>
        <Alert>
          <CheckCircle2 className="size-5" />
          <AlertDescription>Si no ves el correo electrónico, revisa tu carpeta de spam.</AlertDescription>
        </Alert>
        <div className="grid justify-center">
          <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            data-testid={TEST_IDS.backToForgotPasswordButton}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a recuperar contraseña
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <TypographyH1>Recuperar Contraseña</TypographyH1>
      <FormForgotPassword setIsSubmitted={setIsSubmitted} />
      <div className="flex justify-center">
        <Link href={APP_LINKS.LOGIN_PAGE} className={buttonVariants({ variant: "link" })}>
          Volver inicio de sesión
        </Link>
      </div>
    </>
  );
}
