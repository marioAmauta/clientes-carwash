import { Metadata } from "next";

import { verifyUserLoggedIn } from "@/data-access/auth-check";

import { NextPageProps } from "@/lib/definitions";

import { FormCustomer } from "@/app/(user)/crear-cliente/form-customer";

import { TypographyH1 } from "@/components/ui/typography";

const title = "Crear Cliente";

export const metadata: Metadata = {
  title
};

export default async function CreateCustomerPage({
  searchParams: { carPlate }
}: NextPageProps<null, { carPlate: string }>) {
  await verifyUserLoggedIn();

  return (
    <>
      <TypographyH1>{title}</TypographyH1>
      <FormCustomer carPlateFromSearch={carPlate} />
    </>
  );
}
