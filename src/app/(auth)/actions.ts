"use server";

import { redirect } from "next/navigation";

import { APP_LINKS } from "@/lib/constants";
import { deleteSession, validateRequest } from "@/lib/session";

export async function logoutAction() {
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  await deleteSession({ sessionId: session.id });

  redirect(APP_LINKS.LOGIN_PAGE);
}
