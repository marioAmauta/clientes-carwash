import { Metadata } from "next";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getInvitationCodes } from "@/data-access/invitation-codes";

import { APP_LINKS, TEST_IDS } from "@/lib/constants";

import { ListGrid } from "@/components/layout/list-grid";
import { LinkButtonCreate } from "@/components/link-button-create";
import { TypographyLead } from "@/components/ui/typography";

import { CardInvitationCode } from "./card-invitation-code";

export const metadata: Metadata = {
  title: "Invitaciones"
};

export default async function InvitationCodesPage() {
  await verifyUserLoggedIn({ checkIfIsAdmin: true });

  const invitationCodes = await getInvitationCodes();

  if (invitationCodes.length === 0) {
    return (
      <>
        <TypographyLead className="text-center">No hay códigos de invitación</TypographyLead>
        <div className="mx-auto w-fit">
          <LinkButtonCreate
            href={APP_LINKS.CREATE_INVITATION_CODE_PAGE}
            label="Crear Invitación"
            testId={TEST_IDS.createInvitationLink}
          />
        </div>
      </>
    );
  }

  return (
    <ListGrid>
      {invitationCodes.map((invitationCode) => (
        <CardInvitationCode key={invitationCode.id} {...invitationCode} />
      ))}
    </ListGrid>
  );
}
