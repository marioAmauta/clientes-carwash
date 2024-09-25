"use server";

import { Tip } from "@prisma/client";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { editTip } from "@/data-access/tip";

import { APP_LINKS, ERROR_MESSAGES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { tipSchema } from "@/lib/schemas";

export async function editTipAction({
  data,
  id
}: Pick<Tip, "id"> & { data: unknown }): Promise<ActionReturnType | undefined> {
  await verifyUserLoggedIn();

  const tipParsedData = tipSchema.safeParse(data);

  if (!tipParsedData.success) {
    return {
      success: false,
      errors: tipParsedData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  const { tip, tipComment } = tipParsedData.data;

  const editedTip = await editTip({
    id,
    tip,
    tipComment
  });

  if (!editedTip) {
    return {
      success: false
    };
  }

  redirect(APP_LINKS.HOME_PAGE);
}
