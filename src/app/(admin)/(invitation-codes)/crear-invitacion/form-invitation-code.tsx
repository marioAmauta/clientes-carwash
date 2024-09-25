"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { NewInvitationCodeSchemaType } from "@/lib/definitions";
import { newInvitationCodeSchema } from "@/lib/schemas";

import { FormButtonCancel } from "@/components/form-button-cancel";
import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createInvitationCodeAction } from "./actions";

export function FormInvitationCode() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewInvitationCodeSchemaType>({
    resolver: zodResolver(newInvitationCodeSchema),
    defaultValues: {
      invitationCode: ""
    }
  });

  async function onSubmit({ invitationCode }: NewInvitationCodeSchemaType) {
    startTransition(async () => {
      const response = await createInvitationCodeAction({ code: invitationCode });

      if (response && !response.success) {
        toast.error(response.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4">
        <FormField
          control={form.control}
          name="invitationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Invitación</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa el código de invitación"
                  data-testid={TEST_IDS.formInvitationCode.invitationCode}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtonContainer>
          <FormButtonCancel />
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.formInvitationCode.submitButton}>
            Crear Código
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
