"use client";

import { Customer } from "@prisma/client";

import { TEST_IDS } from "@/lib/constants";

import { useEditCustomer } from "@/hooks/use-edit-customer";

import { ButtonDelete } from "@/components/button-delete";
import { ButtonOptions } from "@/components/button-options";

export function ButtonOptionsCustomer({ carPlate }: Pick<Customer, "carPlate">) {
  const { isPending, onEditCustomer, onDeleteCustomer } = useEditCustomer({ carPlate });

  return (
    <ButtonOptions
      mainActionLabel="Editar Cliente"
      onMainAction={onEditCustomer}
      isPending={isPending}
      testIds={{
        triggerButton: `${TEST_IDS.customerOptionsButton}${carPlate}`,
        mainActionButton: `${TEST_IDS.customerEditButton}${carPlate}`
      }}
      deleteActionChildren={
        <ButtonDelete
          dialogTitle="¿Quieres eliminar este cliente?"
          dialogActionLabel="Eliminar cliente"
          onDeleteAction={onDeleteCustomer}
          triggerChild={<span>Eliminar Cliente</span>}
          buttonActionTestId={`${TEST_IDS.customerDeleteButton}${carPlate}`}
        />
      }
    />
  );
}
