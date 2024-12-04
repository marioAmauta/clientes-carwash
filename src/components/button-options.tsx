"use client";

import { EllipsisVertical } from "lucide-react";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { useButtonOptions } from "@/hooks/use-button-options";

import { Modal } from "@/components/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type ButtonOptionsProps = PropsWithChildren<{
  isPending: boolean;
  triggerButtonTestId?: string;
}>;

export function ButtonOptions({ isPending, triggerButtonTestId, children }: ButtonOptionsProps) {
  const { isOpen, setIsOpen } = useButtonOptions({ isPending });

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger data-testid={triggerButtonTestId}>
          <EllipsisVertical className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
      {isPending && createPortal(<Modal type="loading" />, document.body)}
    </>
  );
}
