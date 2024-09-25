"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { APP_LINKS, TEST_IDS } from "@/lib/constants";

import { deleteTipAction } from "@/app/(user)/actions";

import { ButtonDelete } from "@/components/button-delete";
import { ButtonOptions } from "@/components/button-options";

type ButtonOptionsTipProps = {
  tipId: string;
  carPlate: string;
};

export function ButtonOptionsTip({ tipId, carPlate }: ButtonOptionsTipProps) {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  function onEditTip() {
    const params = new URLSearchParams({ carPlate, tipId });

    push(`${APP_LINKS.EDIT_TIP_PAGE}?${params}`);
  }

  function onDeleteTip() {
    startTransition(async () => {
      await deleteTipAction({ id: tipId });
    });
  }

  return (
    <ButtonOptions
      mainActionLabel="Editar Propina"
      onMainAction={onEditTip}
      isPending={isPending}
      testIds={{
        triggerButton: `${TEST_IDS.tipOptionsButton}${carPlate}`,
        mainActionButton: `${TEST_IDS.tipEditButton}${carPlate}`
      }}
      deleteActionChildren={
        <ButtonDelete
          dialogTitle="¿Quieres eliminar esta propina?"
          dialogActionLabel="Eliminar propina"
          onDeleteAction={onDeleteTip}
          triggerChild={<span>Eliminar Propina</span>}
          buttonActionTestId={`${TEST_IDS.tipDeleteButton}${carPlate}`}
        />
      }
    />
  );
}
