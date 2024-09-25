"use client";

import Link from "next/link";
import { createPortal } from "react-dom";

import { APP_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { useEditCustomer } from "@/hooks/use-edit-customer";

import { ButtonDelete } from "@/components/button-delete";
import { Modal } from "@/components/Modal";
import { Button, buttonVariants } from "@/components/ui/button";

type ButtonContainerCustomerDetailsProps = {
  carPlate: string;
  isCustomerCreator: boolean;
};

export function ButtonContainerCustomerDetails({ carPlate, isCustomerCreator }: ButtonContainerCustomerDetailsProps) {
  const { isPending, onEditCustomer, onDeleteCustomer } = useEditCustomer({ carPlate });

  return (
    <>
      <div className={cn("mx-auto grid w-fit gap-4", isCustomerCreator ? "grid-cols-3" : "grid-cols-1")}>
        {isCustomerCreator ? (
          <>
            <ButtonDelete
              dialogTitle="¿Quieres eliminar este cliente?"
              dialogActionLabel="Eliminar cliente"
              onDeleteAction={onDeleteCustomer}
              triggerChild={
                <Button variant="destructive" size="sm">
                  Eliminar
                </Button>
              }
            />
            <Button size="sm" onClick={onEditCustomer}>
              Editar
            </Button>
          </>
        ) : null}
        <Link
          href={`${APP_LINKS.NEW_TIP_PAGE}?${new URLSearchParams({ carPlate })}`}
          className={cn(buttonVariants({ size: "sm" }), "bg-green-500")}
        >
          Nueva Propina
        </Link>
      </div>
      {isPending && createPortal(<Modal type="loading" />, document.body)}
    </>
  );
}
