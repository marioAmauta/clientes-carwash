"use server";

import { hash } from "bcrypt";
import { redirect } from "next/navigation";

import {
  getInvitationCodeForRegisterAction,
  updateInvitationCodeForRegisterAction
} from "@/data-access/invitation-codes";
import {
  createUserForRegisterAction,
  getEmailForRegisterAction,
  getUsernameForRegisterAction,
  getUsersQuantityForRegisterAction
} from "@/data-access/user";

import { APP_LINKS, ERROR_MESSAGES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { registerSchema } from "@/lib/schemas";
import { createSession } from "@/lib/session";

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

  const foundEmail = await getEmailForRegisterAction({ email });

  if (foundEmail) {
    return {
      success: false,
      message: ERROR_MESSAGES.ALREADY_USED_EMAIL
    };
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await createUserForRegisterAction({ username, email, password: hashedPassword });

  if (foundInvitationCode) {
    await updateInvitationCodeForRegisterAction({ code: foundInvitationCode.code, isUsed: true });
  }

  await createSession({ userId: newUser.id });

  redirect(APP_LINKS.HOME_PAGE);
}
