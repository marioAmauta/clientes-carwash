import { Metadata } from "next";
import React from "react";

import { verifyUserLoggedIn } from "@/data-access/auth-check";

import { TypographyH1 } from "@/components/ui/typography";

import { FormCustomerCreate } from "./form-customer-create";

const title = "Crear Cliente";

export const metadata: Metadata = {
  title
};

export default async function CreateCustomerPage() {
  await verifyUserLoggedIn();

  return (
    <>
      <TypographyH1>{title}</TypographyH1>
      <FormCustomerCreate />
    </>
  );
}
