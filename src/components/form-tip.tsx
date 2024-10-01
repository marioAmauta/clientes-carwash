"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { TipSchemaType } from "@/lib/definitions";
import { tipSchema } from "@/lib/schemas";

import { createTipAction } from "@/app/(user)/crear-propina/actions";
import { editTipAction } from "@/app/(user)/editar-propina/actions";

import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormTipProps = Partial<{ customerId: string; tipId: string } & TipSchemaType>;

export function FormTip({ customerId, tipId, tip, tipComment }: FormTipProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TipSchemaType>({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      tip: tip ?? "",
      tipComment: tipComment ?? ""
    }
  });

  async function onSubmit(data: TipSchemaType) {
    startTransition(async () => {
      let response;

      if (customerId) {
        response = await createTipAction({ data, customerId });
      }

      if (tipId) {
        response = await editTipAction({ data, id: tipId });
      }

      if (response && !response.success) {
        toast.error(response.message);
      }
    });
  }

  useEffect(() => {
    form.setFocus("tip");
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="tip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Propina</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ingresa la propina" data-testid={TEST_IDS.tipForm.tip} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario de la propina (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ingresa un comentario para la propina"
                    data-testid={TEST_IDS.tipForm.comment}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormCard>
        <FormButtonContainer withCancelButton>
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.tipForm.submitButton}>
            {customerId ? "Agregar" : "Actualizar"}
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
