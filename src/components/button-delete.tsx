"use client";

import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

type ButtonDeleteProps = {
  triggerChild: ReactNode;
  dialogTitle: string;
  dialogActionLabel: string;
  onDeleteAction: () => void;
  buttonActionTestId?: string;
};

export function ButtonDelete({
  triggerChild,
  dialogTitle,
  dialogActionLabel,
  onDeleteAction,
  buttonActionTestId
}: ButtonDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerChild}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>Selecciona una opción</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            data-testid={buttonActionTestId}
            onClick={onDeleteAction}
            className={buttonVariants({ variant: "destructive" })}
          >
            {dialogActionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
