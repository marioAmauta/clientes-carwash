"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TEST_IDS } from "@/lib/constants";
import { CustomerDataForEdit, CustomerSchemaType } from "@/lib/definitions";
import { customerSchema } from "@/lib/schemas";

import { editCustomerAction } from "@/app/(user)/(tips-customers)/actions";

import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export type FormCustomerEditProps = {
  customer: CustomerDataForEdit;
  editCustomer: boolean;
  setEditCustomer: (value: boolean) => void;
  withRedirect?: boolean;
};

export function FormCustomerEdit({ customer, editCustomer, setEditCustomer, withRedirect }: FormCustomerEditProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      carPlate: customer.carPlate ?? "",
      customerDescription: customer.customerDescription ?? ""
    }
  });

  async function onSubmit(data: CustomerSchemaType) {
    startTransition(async () => {
      const response = await editCustomerAction({ id: customer.id, data, tempCarPlate: customer.carPlate });

      if (response && !response.success) {
        toast.error(response.message);
      } else {
        setEditCustomer(false);

        if (withRedirect && response && response.message) {
          router.replace(`/${response.message}`);
        }

        router.refresh();
      }
    });
  }

  return (
    <Dialog open={editCustomer} onOpenChange={setEditCustomer}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cliente {customer.carPlate}</DialogTitle>
          <DialogDescription>Editar información del cliente</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormCard className="max-w-full">
              <FormField
                control={form.control}
                name="carPlate"
                render={({ field }) => {
                  field.value = field.value.toUpperCase();

                  return (
                    <FormItem>
                      <FormLabel>Patente</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa la patente"
                          data-testid={TEST_IDS.customerForm.carPlate}
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
            </FormCard>
            <FormButtonLoading
              type="submit"
              loading={isPending}
              data-testid={TEST_IDS.customerForm.submitButton}
              className="mt-4 w-full"
            >
              Actualizar
            </FormButtonLoading>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
