"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { TipSchemaType } from "@/lib/definitions";
import { tipSchema } from "@/lib/schemas";

import { FormButtonCancel } from "@/components/form-button-cancel";
import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createTipAction } from "./actions";

type FormTipProps = { customerId: string };

export function FormTip({ customerId }: FormTipProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TipSchemaType>({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      tip: "",
      tipComment: ""
    }
  });

  async function onSubmit(data: TipSchemaType) {
    startTransition(async () => {
      const response = await createTipAction({ data, customerId });

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
        <Accordion type="single" collapsible>
          <AccordionItem value="optional-fields">
            <AccordionTrigger data-testid={TEST_IDS.tipForm.commentToggleButton}>Campos opcionales</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <FormField
                control={form.control}
                name="tipComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentario de la propina</FormLabel>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <FormButtonContainer>
          <FormButtonCancel />
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.tipForm.submitButton}>
            Agregar Propina
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
