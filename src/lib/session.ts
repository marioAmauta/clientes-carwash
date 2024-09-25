import "server-only";

import { lucia } from "@/auth";
import { Session } from "@prisma/client";
import { User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

import { Roles } from "@/lib/definitions";

export async function createSession({ userId }: { userId: string }) {
  const session = await lucia.createSession(userId, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function deleteSession({ sessionId }: { sessionId: string }) {
  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null
      };
    }

    const result = await lucia.validateSession(sessionId);

    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    return result;
  }
);

export const sessionUtility = cache(async () => {
  const { user } = await validateRequest();

  const isAdmin = user ? user.role === Roles.Admin : false;

  return {
    user,
    isAdmin
  };
});
