"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { LoginSchemaType } from "@/lib/definitions";
import { loginSchema } from "@/lib/schemas";

import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";

import { loginAction } from "./actions";

export function FormLogin() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // Getting the email and password from the URL query params is just for demo purposes
      email: searchParams.get("email") ?? "",
      password: searchParams.get("password") ?? ""
    }
  });

  async function onSubmit(data: LoginSchemaType) {
    startTransition(async () => {
      const response = await loginAction({ data });

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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <InputPassword
                    placeholder="Ingresa tu contraseña"
                    data-testid={TEST_IDS.loginForm.password}
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
            data-testid={TEST_IDS.loginForm.submitButton}
          >
            Iniciar sesión
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
