"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { RegisterSchemaType } from "@/lib/definitions";
import { registerSchema } from "@/lib/schemas";

import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";

import { registerAction } from "./actions";

export function FormRegister() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      invitationCode: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(data: RegisterSchemaType) {
    startTransition(async () => {
      const response = await registerAction({ data });

      if (response && !response.success) {
        toast.error(response.message, { duration: 5000 });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="invitationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de invitación</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu código de invitación"
                    data-testid={TEST_IDS.registerForm.invitationCode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu nombre de usuario"
                    data-testid={TEST_IDS.registerForm.username}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingresa tu email"
                    data-testid={TEST_IDS.registerForm.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormButtonLoading
            type="submit"
            className="w-full"
            loading={isPending}
            data-testid={TEST_IDS.registerForm.submitButton}
          >
            Crear cuenta
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
