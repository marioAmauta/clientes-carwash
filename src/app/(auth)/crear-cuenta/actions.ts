"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import {
  getInvitationCodeForRegisterAction,
  updateInvitationCodeForRegisterAction
} from "@/data-access/invitation-codes";
import { getUsernameForRegisterAction, getUsersQuantityForRegisterAction } from "@/data-access/user";

import { APP_LINKS, ERROR_MESSAGES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { registerSchema } from "@/lib/schemas";

export async function registerAction({ data }: { data: unknown }): Promise<ActionReturnType> {
  const parsedRegisterData = registerSchema.safeParse(data);

  if (!parsedRegisterData.success) {
    return {
      success: false,
      errors: parsedRegisterData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS
    };
  }

  const { invitationCode, username, email, password } = parsedRegisterData.data;

  const usersQuantity = await getUsersQuantityForRegisterAction();

  const foundInvitationCode = await getInvitationCodeForRegisterAction({ code: invitationCode });

  if (usersQuantity > 0) {
    if (!foundInvitationCode) {
      return {
        success: false,
        message: ERROR_MESSAGES.INVALID_INVITATION_CODE
      };
    }

    if (foundInvitationCode.isUsed) {
      return {
        success: false,
        message: ERROR_MESSAGES.ALREADY_USED_INVITATION_CODE
      };
    }
  }

  const foundUsername = await getUsernameForRegisterAction({ username });

  if (foundUsername) {
    return {
      success: false,
      message: ERROR_MESSAGES.ALREADY_USED_USERNAME
    };
  }

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: username
    }
  });

  if (foundInvitationCode) {
    await updateInvitationCodeForRegisterAction({ code: foundInvitationCode.code, isUsed: true });
  }

  redirect(APP_LINKS.HOME_PAGE);
}
