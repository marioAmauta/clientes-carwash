"use server";

import { revalidatePath } from "next/cache";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { deleteInvitationCode } from "@/data-access/invitation-codes";

import { APP_LINKS } from "@/lib/constants";

export async function deleteInvitationCodeAction({ code }: { code: string }) {
  await verifyUserLoggedIn({ checkIfIsAdmin: true });

  await deleteInvitationCode({ code });

  revalidatePath(APP_LINKS.INVITATION_CODES_PAGE);

  return true;
}
