import { PropsWithChildren } from "react";

import { verifyUserLoggedIn } from "@/data-access/auth-check";

import { APP_LINKS, TEST_IDS } from "@/lib/constants";

import { TabsMenuLink, TabsMenuLinkType } from "@/components/layout/tabs-menu-link";

const tabs: TabsMenuLinkType[] = [
  {
    hrefAsValue: APP_LINKS.CREATE_INVITATION_CODE_PAGE,
    triggerLabel: "Crear Invitación"
  },
  {
    hrefAsValue: APP_LINKS.INVITATION_CODES_PAGE,
    triggerLabel: "Códigos de Invitación",
    testId: TEST_IDS.invitationCodeLinkTab
  }
];

export default async function InvitationCodesLayout({ children }: PropsWithChildren) {
  await verifyUserLoggedIn({ checkIfIsAdmin: true });

  return (
    <>
      <TabsMenuLink tabs={tabs} />
      {children}
    </>
  );
}
