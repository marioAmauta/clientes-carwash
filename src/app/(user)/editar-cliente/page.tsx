import { Metadata } from "next";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCustomerWithLastTipByCarPlate } from "@/data-access/customer";

import { APP_LINKS } from "@/lib/constants";
import { NextPageProps } from "@/lib/definitions";

import { TypographyH2 } from "@/components/ui/typography";

import { FormCustomerEdit } from "./form-customer-edit";

const title = "Editar Cliente";

export const metadata: Metadata = {
  title
};

export default async function EditCustomerPage({
  searchParams: { carPlate }
}: NextPageProps<null, { carPlate: string }>) {
  await verifyUserLoggedIn();

  const foundCustomer = await getCustomerWithLastTipByCarPlate({ carPlate });

  if (!foundCustomer) {
    return redirect(`${APP_LINKS.NEW_CUSTOMER_PAGE}?${new URLSearchParams({ carPlate })}`);
  }

  return (
    <>
      <TypographyH2 className="text-center">{title}</TypographyH2>
      <FormCustomerEdit
        carPlate={foundCustomer.carPlate}
        customerDescription={foundCustomer.customerDescription ?? undefined}
      />
    </>
  );
}
