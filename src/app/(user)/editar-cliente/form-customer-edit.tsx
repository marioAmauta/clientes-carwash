"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { CustomerSchemaType } from "@/lib/definitions";
import { customerSchema } from "@/lib/schemas";

import { FormButtonCancel } from "@/components/form-button-cancel";
import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { editCustomerAction } from "./actions";

export function FormCustomerEdit({ carPlate, customerDescription }: CustomerSchemaType) {
  const [isPending, startTransition] = useTransition();
  const { back, refresh } = useRouter();

  const form = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      carPlate: carPlate ?? "",
      customerDescription: customerDescription ?? ""
    }
  });

  async function onSubmit(data: CustomerSchemaType) {
    startTransition(async () => {
      const response = await editCustomerAction({ data, carPlate });

      if (response && !response.success) {
        toast.error(response.message);
      } else {
        back();
        refresh();
      }
    });
  }

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
        <FormButtonContainer>
          <FormButtonCancel data-testid={TEST_IDS.customerForm.cancelButton} />
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.customerForm.submitButton}>
            Actualizar Cliente
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
