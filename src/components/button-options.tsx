"use client";

import { EllipsisVertical } from "lucide-react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { eventPreventDefault } from "@/lib/utils";

import { useButtonOptions } from "@/hooks/use-button-options";

import { Modal } from "@/components/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type ButtonOptionsProps = {
  isPending: boolean;
  onMainAction: () => void;
  mainActionLabel: string;
  deleteActionChildren: ReactNode;
  testIds?: {
    triggerButton?: string;
    mainActionButton?: string;
  };
};

export function ButtonOptions({
  isPending,
  onMainAction,
  mainActionLabel,
  deleteActionChildren,
  testIds
}: ButtonOptionsProps) {
  const { isOpen, setIsOpen } = useButtonOptions({ isPending });

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger data-testid={testIds?.triggerButton}>
          <EllipsisVertical className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onMainAction} data-testid={testIds?.mainActionButton}>
            {mainActionLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={eventPreventDefault} data-testid={testIds?.triggerButton}>
            {deleteActionChildren}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isPending && createPortal(<Modal type="loading" />, document.body)}
    </>
  );
}
