import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCustomerWithTipsByCarPlate } from "@/data-access/customer";

import { APP_LINKS, TEST_IDS, SORTING_OPTIONS_TIP_AND_CUSTOMER } from "@/lib/constants";
import { Params, SearchParams } from "@/lib/definitions";
import { generatePaginationParams, getChileanDateFormat } from "@/lib/utils";

import { ListGrid } from "@/components/layout/list-grid";
import { PaginationControl } from "@/components/layout/pagination-control";
import { SortingControl } from "@/components/layout/sorting-control";
import { LinkButtonCreate } from "@/components/link-button-create";
import { Badge } from "@/components/ui/badge";
import { TypographyH1, TypographyH2, TypographyLead } from "@/components/ui/typography";

import { ButtonContainerCustomerDetails } from "./button-container-customer-details";
import { CardTip } from "./card-tip";

export default async function CustomerDetailPage({
  params,
  searchParams
}: {
  params: Params<{ carPlate: string }>;
  searchParams: SearchParams;
}) {
  const { carPlate } = await params;

  const { user } = await verifyUserLoggedIn();

  const { page, limit, sort, start, end } = await generatePaginationParams({ searchParams });

  const foundCustomer = await getCustomerWithTipsByCarPlate({ carPlate, skip: start, take: limit, sort });

  if (!foundCustomer) {
    return (
      <>
        <TypographyH1>Patente no encontrada</TypographyH1>
        <TypographyH2 className="mx-auto w-fit break-all">{`"${carPlate}"`}</TypographyH2>
        <div className="mx-auto w-fit">
          <LinkButtonCreate
            href={`${APP_LINKS.NEW_CUSTOMER_PAGE}?${new URLSearchParams({ carPlate })}`}
            label="Crear cliente con esta patente"
            testId={TEST_IDS.createNewCustomerLinkButton}
          />
        </div>
      </>
    );
  }

  const isCustomerCreator = user?.id === foundCustomer.createdBy?.id;

  const totalCustomerTips = foundCustomer._count.tips;

  return (
    <>
      <header className="flex flex-col items-center gap-3">
        <TypographyH1>{foundCustomer.carPlate}</TypographyH1>
        {foundCustomer.customerDescription ? (
          <TypographyLead className="text-center">{foundCustomer.customerDescription}</TypographyLead>
        ) : null}
        {foundCustomer.createdBy?.name ? <Badge variant="outline">{foundCustomer.createdBy?.name}</Badge> : null}
        <Badge variant="outline">{getChileanDateFormat(foundCustomer.createdAt)}</Badge>
      </header>
      <ButtonContainerCustomerDetails
        customer={{
          id: foundCustomer.id,
          carPlate: foundCustomer.carPlate,
          customerDescription: foundCustomer.customerDescription
        }}
        isCustomerCreator={isCustomerCreator}
      />
      {totalCustomerTips > 0 ? (
        <>
          <SortingControl
            label="propinas"
            start={start}
            end={end}
            totalItems={totalCustomerTips}
            sortingOptions={SORTING_OPTIONS_TIP_AND_CUSTOMER}
          />
          <ListGrid>
            {foundCustomer.tips.map((tips) => (
              <CardTip
                key={tips.id}
                loggedUserId={user.id}
                customer={{
                  id: foundCustomer.id,
                  carPlate: foundCustomer.carPlate,
                  customerDescription: foundCustomer.customerDescription
                }}
                {...tips}
              />
            ))}
          </ListGrid>
          <PaginationControl start={start} end={end} page={page} limit={limit} totalItems={totalCustomerTips} />
        </>
      ) : (
        <TypographyLead className="text-center">No hay propinas</TypographyLead>
      )}
    </>
  );
}
