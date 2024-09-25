import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCustomers, getTotalCustomers } from "@/data-access/customer";

import { SORTING_OPTIONS_CUSTOMER } from "@/lib/constants";
import { NextPageProps } from "@/lib/definitions";
import { generatePaginationParams } from "@/lib/utils";

import { CardCustomer } from "@/components/card-customer";
import { ListGrid } from "@/components/layout/list-grid";
import { PaginationControl } from "@/components/layout/pagination-control";
import { SortingControl } from "@/components/layout/sorting-control";

export default async function CustomersPage({ searchParams }: NextPageProps) {
  const { user } = await verifyUserLoggedIn();

  const { page, limit, sort, start, end } = generatePaginationParams({ searchParams });

  const customers = await getCustomers({ skip: start, take: limit, sort });

  const totalCustomers = await getTotalCustomers();

  return (
    <>
      <SortingControl
        label="clientes"
        start={start}
        end={end}
        totalItems={totalCustomers}
        sortingOptions={SORTING_OPTIONS_CUSTOMER}
      />
      <ListGrid>
        {customers.map((customer) => (
          <CardCustomer {...customer} key={customer.carPlate} userId={user.id}></CardCustomer>
        ))}
      </ListGrid>
      <PaginationControl page={page} limit={limit} start={start} end={end} totalItems={totalCustomers} />
    </>
  );
}
