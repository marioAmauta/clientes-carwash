import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { APP_LINKS } from "@/lib/constants";
import { Roles } from "@/lib/definitions";
import { validateRequest } from "@/lib/session";

type VerifyUserLoggedInOptions = {
  checkIfIsAdmin?: boolean;
  checkIfIsTheSameUser?: boolean;
  username?: string;
};

export const verifyUserLoggedIn = cache(
  async ({ checkIfIsAdmin, checkIfIsTheSameUser, username }: VerifyUserLoggedInOptions = {}) => {
    const { user, session } = await validateRequest();

    if (!user || !session) {
      return redirect(APP_LINKS.LOGIN_PAGE);
    }

    if ((checkIfIsAdmin && user.role !== Roles.Admin) || (checkIfIsTheSameUser && user.username !== username)) {
      return redirect(APP_LINKS.HOME_PAGE);
    }

    return { user };
  }
);

export const verifyUserLoggedOut = cache(async () => {
  const { user } = await validateRequest();

  if (user) {
    return redirect(APP_LINKS.HOME_PAGE);
  }
});
