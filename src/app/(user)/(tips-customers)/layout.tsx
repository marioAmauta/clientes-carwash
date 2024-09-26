import { PropsWithChildren } from "react";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getTotalCustomers } from "@/data-access/customer";
import { getTotalTips } from "@/data-access/tip";

import { APP_LINKS, SITE_TITLE, TEST_IDS } from "@/lib/constants";

import { TabsMenuLink, TabsMenuLinkType } from "@/components/layout/tabs-menu-link";
import { LinkButtonCreate } from "@/components/link-button-create";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";

export default async function TipsCustomersRootLayout({ children }: PropsWithChildren) {
  await verifyUserLoggedIn();

  const totalCustomers = await getTotalCustomers();

  if (totalCustomers < 1) {
    return (
      <>
        <TypographyH1>{SITE_TITLE}</TypographyH1>
        <TypographyLead className="text-center">No hay clientes registrados</TypographyLead>
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

  const totalTips = await getTotalTips();

  const tabs: TabsMenuLinkType[] = [
    {
      triggerLabel: "Propinas",
      hrefAsValue: APP_LINKS.HOME_PAGE,
      totalItemsCount: totalTips
    },
    {
      triggerLabel: "Clientes",
      hrefAsValue: APP_LINKS.CUSTOMERS_PAGE,
      totalItemsCount: totalCustomers
    }
  ];

  return (
    <>
      <TabsMenuLink tabs={tabs} />
      {children}
    </>
  );
}
