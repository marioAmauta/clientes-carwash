import { Metadata } from "next";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getTipById } from "@/data-access/tip";

import { APP_LINKS } from "@/lib/constants";
import { NextPageProps } from "@/lib/definitions";

import { FormTip } from "@/components/form-tip";
import { TypographyH1, TypographyH2, TypographyLead } from "@/components/ui/typography";

const title = "Editar Propina";

export const metadata: Metadata = {
  title
};

export default async function EditTipPage({
  searchParams: { tipId, carPlate }
}: NextPageProps<null, { tipId: string; carPlate: string }>) {
  await verifyUserLoggedIn();

  const foundTip = await getTipById({ id: tipId });

  if (!foundTip) {
    const params = new URLSearchParams({ carPlate });

    return redirect(`${APP_LINKS.NEW_CUSTOMER_PAGE}?${params}`);
  }

  const { id, tip, tipComment } = foundTip;

  return (
    <>
      <div className="space-y-5 text-center">
        <TypographyH2>{title}</TypographyH2>
        <TypographyH1>{carPlate}</TypographyH1>
        {foundTip.customer.customerDescription && (
          <TypographyLead>{foundTip.customer.customerDescription}</TypographyLead>
        )}
      </div>
      <FormTip tipId={id} tip={String(tip)} tipComment={tipComment ?? undefined} />
    </>
  );
}
