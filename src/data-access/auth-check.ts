import "server-only";

import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { APP_LINKS } from "@/lib/constants";
import { Roles } from "@/lib/definitions";

export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return {
    session: session?.session,
    user: session?.user
  };
});

type VerifyUserLoggedInOptions = {
  checkIfIsAdmin?: boolean;
  checkIfIsTheSameUser?: boolean;
  name?: string;
};

export const verifyUserLoggedIn = cache(
  async ({ checkIfIsAdmin, checkIfIsTheSameUser, name }: VerifyUserLoggedInOptions = {}) => {
    const { user, session } = await getServerSession();

    if (!user || !session) {
      return redirect(APP_LINKS.LOGIN_PAGE);
    }

    if ((checkIfIsAdmin && user.role !== Roles.Admin) || (checkIfIsTheSameUser && user.name !== name)) {
      return redirect(APP_LINKS.HOME_PAGE);
    }

    return { user };
  }
);

export const verifyUserLoggedOut = cache(async () => {
  const { user } = await getServerSession();

  if (user) {
    return redirect(APP_LINKS.HOME_PAGE);
  }
});
