"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import { TEST_IDS } from "@/lib/constants";
import { NewCustomerSchemaType } from "@/lib/definitions";
import { newCustomerSchema } from "@/lib/schemas";

import { FormButtonCancel } from "@/components/form-button-cancel";
import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createCustomerAction } from "./actions";

type CustomerFormProps = {
  carPlateFromSearch?: string;
  customer?: NewCustomerSchemaType;
};

export function FormCustomer({ carPlateFromSearch, customer }: CustomerFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewCustomerSchemaType>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: {
      carPlate: customer?.carPlate ?? carPlateFromSearch ?? "",
      customerDescription: customer?.customerDescription ?? "",
      tip: customer?.tip ?? "",
      tipComment: customer?.tipComment ?? ""
    }
  });

  async function onSubmit(data: NewCustomerSchemaType) {
    startTransition(async () => {
      await createCustomerAction({ data });
    });
  }

  useEffect(() => {
    if (form.watch("carPlate")) {
      form.setFocus("tip");
    } else {
      form.setFocus("carPlate");
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4">
        <FormField
          control={form.control}
          name="carPlate"
          render={({ field }) => {
            field.value = field.value.toUpperCase();

            return (
              <FormItem>
                <FormLabel>Patente</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa la patente" data-testid={TEST_IDS.customerForm.carPlate} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="tip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propina</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Ingresa la propina"
                  data-testid={TEST_IDS.customerForm.tip}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="optional-fields">
            <AccordionTrigger data-testid={TEST_IDS.customerForm.optionalFieldsToggle}>
              Campos opcionales
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <FormField
                control={form.control}
                name="customerDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del cliente</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingresa una descripción del cliente"
                        data-testid={TEST_IDS.customerForm.description}
                        className="resize-none"
                        {...field}
                      />
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <FormButtonContainer>
          <FormButtonCancel />
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.customerForm.submitButton}>
            Crear Cliente
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
