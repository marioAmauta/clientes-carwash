import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getTipsCreatedByUserCount, getTipsCreatedByUserWithCustomerInfo } from "@/data-access/tip";

import { SORTING_OPTIONS_TIP_AND_CUSTOMER } from "@/lib/constants";
import { NextPageProps } from "@/lib/definitions";
import { generatePaginationParams } from "@/lib/utils";

import { CardTipWithCustomerInfo } from "@/components/card-tip-with-customer-info";
import { ListGrid } from "@/components/layout/list-grid";
import { PaginationControl } from "@/components/layout/pagination-control";
import { SortingControl } from "@/components/layout/sorting-control";
import { Card } from "@/components/ui/card";

export default async function TipsByUserPage({
  params: { username },
  searchParams
}: NextPageProps<{ username: string }>) {
  const { user } = await verifyUserLoggedIn({ username, checkIfIsTheSameUser: true });

  const { page, limit, sort, start, end } = generatePaginationParams({ searchParams });

  const tipsCreatedByUserWithCustomerInfo = await getTipsCreatedByUserWithCustomerInfo({
    createdById: user.id,
    skip: start,
    take: limit,
    sort
  });

  const tipsCreatedByUserCount = await getTipsCreatedByUserCount({ createdById: user.id });

  return (
    <>
      <SortingControl
        label="propinas"
        start={start}
        end={end}
        totalItems={tipsCreatedByUserCount}
        sortingOptions={SORTING_OPTIONS_TIP_AND_CUSTOMER}
      />
      <ListGrid>
        {tipsCreatedByUserWithCustomerInfo.map((tip) => (
          <Card key={tip.id}>
            <CardTipWithCustomerInfo {...tip} userId={user.id} hiddenCreatorUsername />
          </Card>
        ))}
      </ListGrid>
      <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={tipsCreatedByUserCount} />
    </>
  );
}
