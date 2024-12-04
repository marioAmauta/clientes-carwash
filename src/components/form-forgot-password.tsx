"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";
import { APP_LINKS, TEST_IDS } from "@/lib/constants";
import { ForgotPasswordSchemaType } from "@/lib/definitions";
import { forgotPasswordSchema } from "@/lib/schemas";

import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function FormForgotPassword({ setIsSubmitted }: { setIsSubmitted: (value: boolean) => void }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit({ email }: ForgotPasswordSchemaType) {
    startTransition(async () => {
      await authClient.forgetPassword({
        email,
        redirectTo: APP_LINKS.RESET_PASSWORD_PAGE
      });

      setIsSubmitted(true);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    data-testid={TEST_IDS.loginForm.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormCard>
        <FormButtonContainer>
          <FormButtonLoading type="submit" className="w-full" loading={isPending}>
            Enviar link de recuperación
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
