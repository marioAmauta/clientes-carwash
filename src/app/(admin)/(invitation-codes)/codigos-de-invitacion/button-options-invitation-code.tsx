"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TEST_IDS } from "@/lib/constants";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { ButtonDelete } from "@/components/button-delete";
import { ButtonOptions } from "@/components/button-options";

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
    <ButtonOptions
      mainActionLabel="Copiar Código"
      onMainAction={onCopyInvitationCode}
      isPending={isPending}
      testIds={{
        triggerButton: `${TEST_IDS.invitationCodeOptionsButton}${code}`,
        mainActionButton: `${TEST_IDS.invitationCodeCopyButton}${code}`
      }}
      deleteActionChildren={
        <ButtonDelete
          dialogTitle="¿Quieres eliminar este código?"
          dialogActionLabel="Eliminar código"
          onDeleteAction={onDeleteInvitationCode}
          triggerChild={
            <span data-testid={`${TEST_IDS.invitationCodeDeleteButtonTrigger}${code}`}>Eliminar Código</span>
          }
          buttonActionTestId={`${TEST_IDS.invitationCodeDeleteButton}${code}`}
        />
      }
    />
  );
}
