import "server-only";

import sgMail from "@sendgrid/mail";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { ObjectId } from "mongodb";

import { prisma } from "./db";
import { USER_SESSION_COOKIE_NAME } from "./lib/constants";
import { Roles } from "./lib/definitions";

export const auth = betterAuth({
  trustedOrigins: [process.env.DEV_MOBILE_URL!],
  database: prismaAdapter(prisma, {
    provider: "mongodb"
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

      const msg = {
        to: user.email, // Change to your recipient
        from: process.env.SENDGRID_FROM_EMAIL!, // Change to your verified sender
        subject: "Recuperar contraseña",
        text: `Recupera tu contraseña en ${url}`
      };

      await sgMail.send(msg);
    }
  },
  advanced: {
    cookiePrefix: USER_SESSION_COOKIE_NAME,
    generateId: () => {
      return new ObjectId().toString();
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Roles.User,
        input: false
      }
    }
  },
  plugins: [nextCookies()]
});
