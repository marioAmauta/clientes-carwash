import "server-only";

import { prisma } from "@/db";
import { InvitationCode } from "@prisma/client";
import { cache } from "react";

import { verifyUserLoggedIn } from "./auth-check";

export const getInvitationCodeForRegisterAction = cache(async ({ code }: Pick<InvitationCode, "code">) => {
  return await prisma.invitationCode.findUnique({
    where: { code },
    select: { code: true, isUsed: true }
  });
});

export async function updateInvitationCodeForRegisterAction({ code, isUsed }: Pick<InvitationCode, "code" | "isUsed">) {
  await prisma.invitationCode.update({
    where: { code },
    data: { isUsed }
  });
}

export const getInvitationCodes = cache(async () => {
  await verifyUserLoggedIn({ checkIsAdmin: true });

  return await prisma.invitationCode.findMany({
    orderBy: { createdAt: "desc" }
  });
});

export async function createInvitationCode({ code }: Pick<InvitationCode, "code">) {
  await verifyUserLoggedIn({ checkIsAdmin: true });

  return await prisma.invitationCode.create({
    data: { code }
  });
}

export async function deleteInvitationCode({ code }: Pick<InvitationCode, "code">) {
  await verifyUserLoggedIn({ checkIsAdmin: true });

  return await prisma.invitationCode.delete({
    where: { code }
  });
}
