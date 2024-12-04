"use client";

import { TEST_IDS } from "@/lib/constants";
import { CustomerDataForEdit } from "@/lib/definitions";
import { eventPreventDefault } from "@/lib/utils";

import { useEditCustomer } from "@/hooks/use-edit-customer";

import { ButtonDeleteWithAlertDialog } from "@/components/button-delete-with-alert-dialog";
import { ButtonOptions } from "@/components/button-options";
import { FormCustomerEdit } from "@/components/form-customer-edit";

import { DropdownMenuItem } from "./ui/dropdown-menu";

export function ButtonOptionsCustomer({ customer }: { customer: CustomerDataForEdit }) {
  const { isPending, onDeleteCustomer, editCustomer, setEditCustomer } = useEditCustomer({
    carPlate: customer.carPlate
  });

  return (
    <>
      <ButtonOptions
        isPending={isPending}
        triggerButtonTestId={`${TEST_IDS.customerOptionsButton}${customer.carPlate}`}
      >
        <DropdownMenuItem
          onSelect={() => setEditCustomer(true)}
          data-testid={`${TEST_IDS.customerEditButton}${customer.carPlate}`}
        >
          Editar Cliente
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={eventPreventDefault}>
          <ButtonDeleteWithAlertDialog
            dialogTitle="¿Quieres eliminar este cliente?"
            triggerChild={<span>Eliminar Cliente</span>}
            dialogActionChild={
              <span onClick={onDeleteCustomer} data-testid={`${TEST_IDS.customerDeleteButton}${customer.carPlate}`}>
                Eliminar Cliente
              </span>
            }
          />
        </DropdownMenuItem>
      </ButtonOptions>
      <FormCustomerEdit customer={customer} editCustomer={editCustomer} setEditCustomer={setEditCustomer} />
    </>
  );
}
