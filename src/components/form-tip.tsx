"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { APP_LINKS, TEST_IDS } from "@/lib/constants";
import { TipDataForEdit, TipSchemaType } from "@/lib/definitions";
import { tipSchema } from "@/lib/schemas";

import { createTipAction, editTipAction } from "@/app/(user)/actions";

import { FormButtonLoading } from "@/components/form-button-loading";
import { FormCard } from "@/components/form-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormTipProps = {
  editTip?: boolean;
  tip?: TipDataForEdit;
  customerId: string;
  closeDialog: () => void;
};

export function FormTip({ editTip, tip, customerId, closeDialog }: FormTipProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TipSchemaType>({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      tip: tip?.tip.toString() ?? "",
      tipComment: tip?.tipComment ?? ""
    }
  });

  async function onSubmit(data: TipSchemaType) {
    startTransition(async () => {
      let response;

      if (editTip && tip) {
        response = await editTipAction({ data, tipId: tip.id });
      } else {
        response = await createTipAction({ data, customerId });

        router.push(pathname.replace(APP_LINKS.CUSTOMERS_PAGE, "/"));
      }

      if (response && !response.success) {
        toast.error(response.message);
      }

      router.refresh();

      closeDialog();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormField
            control={form.control}
            name="tipComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario de la propina</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa un comentario para la propina"
                    data-testid={TEST_IDS.tipForm.comment}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </FormCard>
        <FormButtonLoading
          type="submit"
          loading={isPending}
          data-testid={TEST_IDS.tipForm.submitButton}
          className="mt-4 w-full"
        >
          {editTip ? "Actualizar" : "Agregar"}
        </FormButtonLoading>
      </form>
    </Form>
  );
}
