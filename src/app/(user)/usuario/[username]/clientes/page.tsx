import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCustomersCreatedByUser, getCustomersCreatedByUserCount } from "@/data-access/customer";

import { APP_LINKS, SORTING_OPTIONS_CUSTOMER } from "@/lib/constants";
import { Params, SearchParams } from "@/lib/definitions";
import { generatePaginationParams } from "@/lib/utils";

import { CardCustomer } from "@/components/card-customer";
import { ListGrid } from "@/components/layout/list-grid";
import { PaginationControl } from "@/components/layout/pagination-control";
import { SortingControl } from "@/components/layout/sorting-control";
import { LinkButtonCreate } from "@/components/link-button-create";
import { TypographyLead } from "@/components/ui/typography";

export default async function CustomersByUserPage({
  params,
  searchParams
}: {
  params: Params<{ username: string }>;
  searchParams: SearchParams;
}) {
  const { username } = await params;

  const { user } = await verifyUserLoggedIn({ name: username, checkIsSameUser: true });

  const { page, limit, sort, start, end } = await generatePaginationParams({ searchParams });

  const customersCreatedByUser = await getCustomersCreatedByUser({
    createdById: user.id,
    skip: start,
    take: limit,
    sort
  });

  const customersCreatedByUserCount = await getCustomersCreatedByUserCount({ createdById: user.id });

  if (customersCreatedByUserCount === 0) {
    return (
      <>
        <TypographyLead className="text-center">No has creado clientes</TypographyLead>
        <div className="mx-auto w-fit">
          <LinkButtonCreate href={APP_LINKS.NEW_CUSTOMER_PAGE} label="Crear Cliente" />
        </div>
      </>
    );
  }

  return (
    <>
      <SortingControl
        label="clientes"
        start={start}
        end={end}
        totalItems={customersCreatedByUserCount}
        sortingOptions={SORTING_OPTIONS_CUSTOMER}
      />
      <ListGrid>
        {customersCreatedByUser.map((customer) => (
          <CardCustomer key={customer.carPlate} loggedUserId={user.id} {...customer} hiddenCreatorName />
        ))}
      </ListGrid>
      <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={customersCreatedByUserCount} />
    </>
  );
}
