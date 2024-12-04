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
  dialogActionChild: ReactNode;
};

export function ButtonDeleteWithAlertDialog({ triggerChild, dialogTitle, dialogActionChild }: ButtonDeleteProps) {
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
          <AlertDialogAction className={buttonVariants({ variant: "destructive" })} asChild>
            {dialogActionChild}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
