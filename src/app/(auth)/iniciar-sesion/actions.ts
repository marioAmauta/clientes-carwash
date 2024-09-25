"use server";

import { compare } from "bcrypt";
import { redirect } from "next/navigation";

import { getUserByEmailForLoginAction } from "@/data-access/user";

import { APP_LINKS, ERROR_MESSAGES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { loginSchema } from "@/lib/schemas";
import { createSession } from "@/lib/session";

export async function loginAction({ data }: { data: unknown }): Promise<ActionReturnType> {
  const parsedLoginData = loginSchema.safeParse(data);

  if (!parsedLoginData.success) {
    return {
      success: false,
      errors: parsedLoginData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS
    };
  }

  const { email, password } = parsedLoginData.data;

  const foundUser = await getUserByEmailForLoginAction({ email });

  if (!foundUser) {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS
    };
  }

  const passwordMatch = await compare(password, foundUser.hashedPassword);

  if (!passwordMatch) {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS
    };
  }

  await createSession({ userId: foundUser.id });

  redirect(APP_LINKS.HOME_PAGE);
}
