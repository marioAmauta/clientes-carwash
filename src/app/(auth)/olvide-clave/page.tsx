"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { APP_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { FormForgotPassword } from "@/components/form-forgot-password";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <>
        <TypographyH1>Revisa tu email</TypographyH1>
        <TypographyP>Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico.</TypographyP>
        <Alert>
          <CheckCircle2 className="size-5" />
          <AlertDescription>Si no ves el correo electrónico, revisa tu carpeta de spam.</AlertDescription>
        </Alert>
        <div className="grid justify-center">
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
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
      <div className="grid justify-center">
        <Link href={APP_LINKS.LOGIN_PAGE} className={cn(buttonVariants({}), "max-w-max")}>
          Volver al inicio de sesión
        </Link>
      </div>
    </>
  );
}
