"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { APP_LINKS, ERROR_MESSAGES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { loginSchema } from "@/lib/schemas";

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

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    });
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS
    };
  }

  revalidatePath(APP_LINKS.HOME_PAGE);
  redirect(APP_LINKS.HOME_PAGE);
}
