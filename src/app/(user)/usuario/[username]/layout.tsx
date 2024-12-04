import { PropsWithChildren } from "react";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCustomersCreatedByUserCount } from "@/data-access/customer";
import { getTipsCreatedByUserCount } from "@/data-access/tip";

import { APP_LINKS, TEST_IDS } from "@/lib/constants";
import { Params } from "@/lib/definitions";

import { TabsMenuLink, TabsMenuLinkType } from "@/components/layout/tabs-menu-link";
import { LinkButtonCreate } from "@/components/link-button-create";
import { TypographyLead } from "@/components/ui/typography";

import { ProfileHeader } from "./profile-header";

export default async function TipsCustomersUserProfileLayout({
  params,
  children
}: PropsWithChildren<{ params: Params<{ username: string }> }>) {
  const { username } = await params;

  const { user } = await verifyUserLoggedIn({ name: username, checkIfIsTheSameUser: true });

  const tipsCreatedByUserCount = await getTipsCreatedByUserCount({ createdById: user.id });

  if (tipsCreatedByUserCount < 1) {
    return (
      <>
        <ProfileHeader username={user.name} userId={user.id} />
        <TypographyLead className="text-center">No has creado clientes</TypographyLead>
        <div className="mx-auto w-fit">
          <LinkButtonCreate
            href={APP_LINKS.NEW_CUSTOMER_PAGE}
            label="Crear Cliente"
            testId={TEST_IDS.noCustomersCreateCustomerButton}
          />
        </div>
      </>
    );
  }

  const customersCreatedByUserCount = await getCustomersCreatedByUserCount({ createdById: user.id });

  const tabs: TabsMenuLinkType[] = [
    {
      triggerLabel: "Tus Propinas",
      hrefAsValue: `${APP_LINKS.USER_PAGE}/${user.name}`,
      totalItemsCount: tipsCreatedByUserCount
    },
    {
      triggerLabel: "Tus Clientes",
      hrefAsValue: `${APP_LINKS.USER_PAGE}/${user.name}${APP_LINKS.CUSTOMERS_PAGE}`,
      totalItemsCount: customersCreatedByUserCount
    }
  ];

  return (
    <>
      <ProfileHeader username={user.name} userId={user.id} />
      <TabsMenuLink tabs={tabs} />
      {children}
    </>
  );
}
