import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCardTipWithCustomerInfo, getTotalTips } from "@/data-access/tip";

import { APP_LINKS, TEST_IDS, SORTING_OPTIONS_TIP_AND_CUSTOMER } from "@/lib/constants";
import { NextPageProps } from "@/lib/definitions";
import { generatePaginationParams } from "@/lib/utils";

import { CardTipWithCustomerInfo } from "@/components/card-tip-with-customer-info";
import { ListGrid } from "@/components/layout/list-grid";
import { PaginationControl } from "@/components/layout/pagination-control";
import { SortingControl } from "@/components/layout/sorting-control";
import { LinkButtonCreate } from "@/components/link-button-create";
import { Card } from "@/components/ui/card";
import { TypographyLead } from "@/components/ui/typography";

export default async function TipsPage({ searchParams }: NextPageProps) {
  const { user } = await verifyUserLoggedIn();

  const { page, limit, sort, start, end } = generatePaginationParams({ searchParams });

  const tips = await getCardTipWithCustomerInfo({ skip: start, take: limit, sort });

  const totalTips = await getTotalTips();

  if (totalTips === 0) {
    return (
      <>
        <TypographyLead className="text-center">No hay propinas</TypographyLead>
        <div className="mx-auto w-fit">
          <LinkButtonCreate
            href={APP_LINKS.NEW_CUSTOMER_PAGE}
            label="Crear Propina"
            testId={TEST_IDS.noCustomersCreateCustomerButton}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SortingControl
        label="propinas"
        start={start}
        end={end}
        totalItems={totalTips}
        sortingOptions={SORTING_OPTIONS_TIP_AND_CUSTOMER}
      />
      <ListGrid>
        {tips.map((tip) => (
          <Card key={tip.id}>
            <CardTipWithCustomerInfo userId={user.id} {...tip} />
          </Card>
        ))}
      </ListGrid>
      <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={totalTips} />
    </>
  );
}
