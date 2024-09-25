"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { createInvitationCode } from "@/data-access/invitation-codes";

import { APP_LINKS, ERROR_MESSAGES, PRISMA_ERROR_CODES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { invitationCodeSchema } from "@/lib/schemas";

export async function createInvitationCodeAction({ code }: { code: string }): Promise<ActionReturnType> {
  await verifyUserLoggedIn({ checkIfIsAdmin: true });

  const invitationParsedData = invitationCodeSchema.safeParse(code);

  if (!invitationParsedData.success) {
    return {
      success: false,
      errors: invitationParsedData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  try {
    const invitationCode = invitationParsedData.data;

    await createInvitationCode({ code: invitationCode });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_ERROR_CODES.uniqueConstraint) {
        return {
          success: false,
          message: ERROR_MESSAGES.ALREADY_EXISTS_INVITATION_CODE
        };
      }
    }
  }

  revalidatePath(APP_LINKS.INVITATION_CODES_PAGE);
  redirect(APP_LINKS.INVITATION_CODES_PAGE);
}
