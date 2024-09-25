import { Metadata } from "next";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getCustomerIdByCarPlate } from "@/data-access/customer";

import { APP_LINKS } from "@/lib/constants";
import { NextPageProps } from "@/lib/definitions";

import { TypographyH1, TypographyH2 } from "@/components/ui/typography";

import { FormTip } from "./form-tip";

const title = "Agregar Propina";

export const metadata: Metadata = {
  title
};

export default async function CreateTipPage({ searchParams }: NextPageProps<null, { carPlate: string }>) {
  await verifyUserLoggedIn();

  const foundCustomer = await getCustomerIdByCarPlate({ carPlate: searchParams.carPlate });

  if (!foundCustomer) {
    const params = new URLSearchParams({ carPlate: searchParams.carPlate });

    return redirect(`${APP_LINKS.NEW_CUSTOMER_PAGE}?${params}`);
  }

  return (
    <>
      <TypographyH1>{title}</TypographyH1>
      <TypographyH2 className="mx-auto w-max">{`"${searchParams.carPlate}"`}</TypographyH2>
      <FormTip customerId={foundCustomer.id} />
    </>
  );
}
