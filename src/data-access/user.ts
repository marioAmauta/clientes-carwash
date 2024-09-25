import "server-only";

import { prisma } from "@/db";
import { cache } from "react";

import { LoginSchemaType, RegisterSchemaType } from "@/lib/definitions";

export const getUsersQuantityForRegisterAction = cache(async () => {
  return await prisma.user.count();
});

export const getUsernameForRegisterAction = cache(async ({ username }: Pick<RegisterSchemaType, "username">) => {
  return await prisma.user.findUnique({
    where: { username },
    select: { username: true }
  });
});

export const getEmailForRegisterAction = cache(async ({ email }: Pick<RegisterSchemaType, "email">) => {
  return await prisma.user.findUnique({
    where: { email },
    select: { email: true }
  });
});

export async function createUserForRegisterAction({
  username,
  email,
  password
}: Pick<RegisterSchemaType, "username" | "email" | "password">) {
  return await prisma.user.create({
    data: {
      username,
      email,
      hashedPassword: password
    },
    select: {
      id: true
    }
  });
}

export const getUserByEmailForLoginAction = cache(async ({ email }: Pick<LoginSchemaType, "email">) => {
  return await prisma.user.findFirst({
    where: {
      email
    },
    select: {
      id: true,
      username: true,
      email: true,
      hashedPassword: true
    }
  });
});
