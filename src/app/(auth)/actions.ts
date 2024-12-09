"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";

export async function resetPasswordAction(newPassword: string) {
  const nextHeaders = await headers();

  await auth.api.setPassword({
    headers: nextHeaders,
    body: {
      newPassword
    }
  });
}
