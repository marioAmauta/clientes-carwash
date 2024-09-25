import "server-only";

import { prisma } from "@/db";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

import { USER_SESSION_COOKIE_NAME } from "./lib/constants";
import { Roles } from "./lib/definitions";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      username: string;
      role: Roles;
    };
  }
}

const prismaAdapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(prismaAdapter, {
  sessionCookie: {
    name: USER_SESSION_COOKIE_NAME,
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      username: attributes.username,
      role: attributes.role
    };
  }
});
