import { Metadata } from "next";

import { verifyUserLoggedIn } from "@/data-access/auth-check";

import { FormInvitationCode } from "./form-invitation-code";

export const metadata: Metadata = {
  title: "Crear Invitación"
};

export default async function CreateInvitationCodePage() {
  await verifyUserLoggedIn({ checkIsAdmin: true });

  return <FormInvitationCode />;
}
