"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { TEST_IDS } from "@/lib/constants";
import { NewCustomerSchemaType } from "@/lib/definitions";
import { newCustomerSchema } from "@/lib/schemas";

import { useSearchParamsUtil } from "@/hooks/use-search-params-util";

import { FormButtonContainer } from "@/components/form-button-container";
import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createCustomerAction } from "./actions";

export function FormCustomerCreate() {
  const [isPending, startTransition] = useTransition();
  const { searchParamsObject, updateSearchParams } = useSearchParamsUtil();

  const form = useForm<NewCustomerSchemaType>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: {
      carPlate: searchParamsObject.carPlate ?? "",
      customerDescription: searchParamsObject.customerDescription ?? "",
      tipComment: searchParamsObject?.tipComment ?? "",
      tip: searchParamsObject?.tip ?? ""
    }
  });

  async function onSubmit(data: NewCustomerSchemaType) {
    startTransition(async () => {
      await createCustomerAction({ data });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="carPlate"
            render={({ field }) => {
              field.onChange = (event) => {
                const carPlate = event.target.value.toUpperCase();

                form.setValue("carPlate", carPlate);

                updateSearchParams({ carPlate });
              };

              return (
                <FormItem>
                  <FormLabel>Patente</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa la patente"
                      data-testid={TEST_IDS.customerForm.carPlate}
                      autoFocus={Boolean(!form.watch("carPlate"))}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="customerDescription"
            render={({ field }) => {
              field.onChange = (event) => {
                const customerDescription = event.target.value;

                form.setValue("customerDescription", customerDescription);

                updateSearchParams({ customerDescription });
              };

              return (
                <FormItem>
                  <FormLabel>Descripción del cliente</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa una descripción del cliente"
                      data-testid={TEST_IDS.customerForm.description}
                      autoFocus={Boolean(form.watch("carPlate"))}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="tipComment"
            render={({ field }) => {
              field.onChange = (event) => {
                const tipComment = event.target.value;

                form.setValue("tipComment", tipComment);

                updateSearchParams({ tipComment });
              };

              return (
                <FormItem>
                  <FormLabel>Comentario de la propina</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa un comentario para la propina"
                      data-testid={TEST_IDS.customerForm.comment}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="tip"
            render={({ field }) => {
              field.onChange = (event) => {
                const tip = event.target.value;

                form.setValue("tip", tip);

                updateSearchParams({ tip });
              };

              return (
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
              );
            }}
          />
        </FormCard>
        <FormButtonContainer withCancelButton>
          <FormButtonLoading type="submit" loading={isPending} data-testid={TEST_IDS.customerForm.submitButton}>
            Crear Cliente
          </FormButtonLoading>
        </FormButtonContainer>
      </form>
    </Form>
  );
}
