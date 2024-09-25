import { Metadata } from "next";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { getTipById } from "@/data-access/tip";

import { APP_LINKS } from "@/lib/constants";
import { NextPageProps } from "@/lib/definitions";

import { TypographyH1, TypographyH2 } from "@/components/ui/typography";

import { FormTipEdit } from "./form-tip-edit";

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
      <TypographyH1>{title}</TypographyH1>
      <TypographyH2 className="mx-auto w-max">{`"${carPlate}"`}</TypographyH2>
      <FormTipEdit id={id} tip={String(tip)} tipComment={tipComment ?? undefined} />
    </>
  );
}
