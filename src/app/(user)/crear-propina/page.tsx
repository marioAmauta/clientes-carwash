import { Metadata } from "next";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCustomerIdByCarPlate } from "@/data-access/customer";

import { APP_LINKS } from "@/lib/constants";
import { SearchParams } from "@/lib/definitions";

import { FormTip } from "@/components/form-tip";
import { TypographyH1, TypographyH2, TypographyLead } from "@/components/ui/typography";

const title = "Agregar Propina";

export const metadata: Metadata = {
  title
};

export default async function CreateTipPage(props: { searchParams: SearchParams<{ carPlate: string }> }) {
  const searchParams = await props.searchParams;

  await verifyUserLoggedIn();

  const foundCustomer = await getCustomerIdByCarPlate({ carPlate: searchParams.carPlate });

  if (!foundCustomer) {
    const params = new URLSearchParams({ carPlate: searchParams.carPlate });

    return redirect(`${APP_LINKS.NEW_CUSTOMER_PAGE}?${params}`);
  }

  return (
    <>
      <header className="space-y-5 text-center">
        <TypographyH2>{title}</TypographyH2>
        <TypographyH1>{searchParams.carPlate}</TypographyH1>
        {foundCustomer.customerDescription && <TypographyLead>{foundCustomer.customerDescription}</TypographyLead>}
      </header>
      <FormTip customerId={foundCustomer.id} />
    </>
  );
}
