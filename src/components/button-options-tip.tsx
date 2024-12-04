"use client";

import { useState, useTransition } from "react";

import { TEST_IDS } from "@/lib/constants";
import { CustomerDataForEdit, TipDataForEdit } from "@/lib/definitions";
import { eventPreventDefault } from "@/lib/utils";

import { deleteTipAction } from "@/app/(user)/actions";

import { ButtonDeleteWithAlertDialog } from "@/components/button-delete-with-alert-dialog";
import { ButtonOptions } from "@/components/button-options";

import { FormTip } from "./form-tip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export type ButtonOptionsTipProps = {
  tip: TipDataForEdit;
  customer: CustomerDataForEdit;
};

export function ButtonOptionsTip({ tip, customer }: ButtonOptionsTipProps) {
  const [isEditingTip, setIsTipEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDeleteTip() {
    startTransition(async () => {
      await deleteTipAction({ id: tip.id });
    });
  }

  return (
    <>
      <ButtonOptions isPending={isPending} triggerButtonTestId={`${TEST_IDS.tipOptionsButton}${customer.carPlate}`}>
        <DropdownMenuItem
          onSelect={() => setIsTipEditing(true)}
          data-testid={`${TEST_IDS.tipEditButton}${customer.carPlate}`}
        >
          Editar Propina
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={eventPreventDefault}>
          <ButtonDeleteWithAlertDialog
            dialogTitle="¿Quieres eliminar esta propina?"
            triggerChild={<span>Eliminar Propina</span>}
            dialogActionChild={
              <span onClick={onDeleteTip} data-testid={`${TEST_IDS.tipDeleteButton}${customer.carPlate}`}>
                Eliminar Propina
              </span>
            }
          />
        </DropdownMenuItem>
      </ButtonOptions>
      <Dialog open={isEditingTip} onOpenChange={setIsTipEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Propina</DialogTitle>
            <DialogDescription>
              <span>Cliente {customer.carPlate}</span>
              <br />
              <span>{customer.customerDescription}</span>
            </DialogDescription>
          </DialogHeader>
          <FormTip
            tip={tip}
            customerId={customer.id}
            editTip={isEditingTip}
            closeDialog={() => setIsTipEditing(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
