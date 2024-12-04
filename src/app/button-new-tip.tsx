"use client";

import { useState } from "react";

import { CustomerDataForEdit } from "@/lib/definitions";
import { cn } from "@/lib/utils";

import { FormTip } from "@/components/form-tip";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export function ButtonNewTip({ customer }: { customer: CustomerDataForEdit }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ size: "sm" }), "bg-green-500")}>Nueva Propina</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Propina</DialogTitle>
          <DialogDescription>
            <span>{customer.carPlate}</span>
            <br />
            <span>{customer.customerDescription}</span>
          </DialogDescription>
        </DialogHeader>
        <FormTip customerId={customer.id} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
