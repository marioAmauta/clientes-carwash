"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { ResetPasswordSchemaType } from "@/lib/definitions";
import { resetPasswordSchema } from "@/lib/schemas";

import { resetPasswordAction } from "@/app/(auth)/actions";

import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputPassword } from "@/components/ui/input";

export function FormResetPassword() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit({ password }: ResetPasswordSchemaType) {
    startTransition(async () => {
      try {
        await resetPasswordAction(password);
      } catch {
        toast.error("Error al actualizar la contraseña");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="Ingresa tu contraseña"
                    data-testid={TEST_IDS.registerForm.password}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="Ingresa tu contraseña de nuevo"
                    data-testid={TEST_IDS.registerForm.confirmPassword}
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
            Actualizar clave
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
