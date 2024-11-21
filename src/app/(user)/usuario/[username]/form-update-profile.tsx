"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { UpdateProfileSchemaDataType, UpdateProfileSchemaFormType } from "@/lib/definitions";
import { updateProfileSchemaForm } from "@/lib/schemas";

import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateProfileInfoAction } from "./actions";

export function FormUpdateProfile({ userId, username }: UpdateProfileSchemaDataType) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateProfileSchemaFormType>({
    resolver: zodResolver(updateProfileSchemaForm),
    defaultValues: { username }
  });

  async function onSubmit(data: UpdateProfileSchemaFormType) {
    startTransition(async () => {
      const response = await updateProfileInfoAction({ ...data, userId });

      if (response && !response.success) {
        toast.error(response.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu nombre de usuario"
                    data-testid={TEST_IDS.updateProfileForm.username}
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormCard>
        <FormButtonContainer>
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.updateProfileForm.submitButton}>
            Actualizar perfil
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
