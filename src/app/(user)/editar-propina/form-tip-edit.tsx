"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Tip } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { TipSchemaType } from "@/lib/definitions";
import { tipSchema } from "@/lib/schemas";

import { FormButtonCancel } from "@/components/form-button-cancel";
import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { editTipAction } from "./actions";

export function FormTipEdit({ id, tip, tipComment }: TipSchemaType & Pick<Tip, "id">) {
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
      const response = await editTipAction({ data, id });

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
              <FormLabel>Comentario de la propina</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingresa un comentario para la propina"
                  data-testid={TEST_IDS.customerForm.comment}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButtonContainer>
          <FormButtonCancel />
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.tipForm.submitButton}>
            Actualizar Propina
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
