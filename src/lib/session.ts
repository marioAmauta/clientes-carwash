import "server-only";

import { lucia } from "@/auth";
import { User, Session } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

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

type ValidateRequestReturnType = {
  user: User | null;
  session: Session | null;
};

export const validateRequest = cache(async (): Promise<ValidateRequestReturnType> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null
    };
  }

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    // eslint-disable-next-line no-empty
  } catch {}

  return {
    user,
    session
  };
});
