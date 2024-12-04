"use client";

import { createPortal } from "react-dom";

import { TEST_IDS } from "@/lib/constants";
import { CustomerDataForEdit } from "@/lib/definitions";
import { cn } from "@/lib/utils";

import { ButtonNewTip } from "@/app/button-new-tip";

import { useEditCustomer } from "@/hooks/use-edit-customer";

import { ButtonDeleteWithAlertDialog } from "@/components/button-delete-with-alert-dialog";
import { FormCustomerEdit } from "@/components/form-customer-edit";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";

type ButtonContainerCustomerDetailsProps = {
  customer: CustomerDataForEdit;
  isCustomerCreator: boolean;
};

export function ButtonContainerCustomerDetails({ customer, isCustomerCreator }: ButtonContainerCustomerDetailsProps) {
  const { isPending, onDeleteCustomer, editCustomer, setEditCustomer } = useEditCustomer({
    carPlate: customer.carPlate
  });

  return (
    <>
      <div className={cn("mx-auto grid w-fit gap-4", isCustomerCreator ? "grid-cols-3" : "grid-cols-1")}>
        {isCustomerCreator ? (
          <>
            <ButtonDeleteWithAlertDialog
              dialogTitle="¿Quieres eliminar este cliente?"
              triggerChild={
                <Button variant="destructive" size="sm">
                  Eliminar
                </Button>
              }
              dialogActionChild={
                <span onClick={onDeleteCustomer} data-testid={`${TEST_IDS.customerDeleteButton}${customer.carPlate}`}>
                  Eliminar Cliente
                </span>
              }
            />
            <Button size="sm" onClick={() => setEditCustomer(true)}>
              Editar
            </Button>
            <FormCustomerEdit
              withRedirect
              customer={customer}
              editCustomer={editCustomer}
              setEditCustomer={setEditCustomer}
            />
          </>
        ) : null}
        <ButtonNewTip customer={customer} />
      </div>
      {isPending && createPortal(<Modal type="loading" />, document.body)}
    </>
  );
}
