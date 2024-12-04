"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TEST_IDS } from "@/lib/constants";
import { eventPreventDefault } from "@/lib/utils";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { ButtonDeleteWithAlertDialog } from "@/components/button-delete-with-alert-dialog";
import { ButtonOptions } from "@/components/button-options";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { deleteInvitationCodeAction } from "./actions";

export function ButtonOptionsInvitationCode({ code }: { code: string }) {
  const [isPending, startTransition] = useTransition();
  const { copyToClipboard } = useCopyToClipboard();

  async function onCopyInvitationCode() {
    const isCopied = await copyToClipboard(code);

    if (isCopied) {
      toast.success(SUCCESS_MESSAGES.INVITATION_CODE_COPIED);
    } else {
      toast.error(ERROR_MESSAGES.INVITATION_CODE_NOT_COPIED);
    }
  }

  function onDeleteInvitationCode() {
    startTransition(async () => {
      const isDeleted = await deleteInvitationCodeAction({ code });

      if (isDeleted) {
        toast.success(SUCCESS_MESSAGES.INVITATION_CODE_DELETED);
      } else {
        toast.error(ERROR_MESSAGES.INVITATION_CODE_NOT_DELETED);
      }
    });
  }

  return (
    <ButtonOptions isPending={isPending} triggerButtonTestId={`${TEST_IDS.invitationCodeOptionsButton}${code}`}>
      <DropdownMenuItem onSelect={onCopyInvitationCode} data-testid={`${TEST_IDS.invitationCodeCopyButton}${code}`}>
        Copiar Código
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={eventPreventDefault}>
        <ButtonDeleteWithAlertDialog
          dialogTitle="¿Quieres eliminar este código?"
          triggerChild={
            <span data-testid={`${TEST_IDS.invitationCodeDeleteButtonTrigger}${code}`}>Eliminar Propina</span>
          }
          dialogActionChild={
            <Button onClick={onDeleteInvitationCode} data-testid={`${TEST_IDS.invitationCodeDeleteButton}${code}`}>
              Eliminar Código
            </Button>
          }
        />
      </DropdownMenuItem>
    </ButtonOptions>
  );
}
