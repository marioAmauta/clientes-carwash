import "server-only";

import { prisma } from "@/db";
import { cache } from "react";

import { RegisterSchemaType, UpdateProfileSchemaDataType } from "@/lib/definitions";

export const getUsersQuantityForRegisterAction = cache(async () => {
  return await prisma.user.count();
});

export const getUsernameForRegisterAction = cache(async ({ username }: Pick<RegisterSchemaType, "username">) => {
  return await prisma.user.findFirst({
    where: { name: username },
    select: { name: true }
  });
});

export const getEmailForRegisterAction = cache(async ({ email }: Pick<RegisterSchemaType, "email">) => {
  return await prisma.user.findUnique({
    where: { email },
    select: { email: true }
  });
});

export async function updateProfileInfo({ userId, username }: UpdateProfileSchemaDataType) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      name: username
    },
    select: {
      name: true
    }
  });
}
