import Link from "next/link";

import { CustomerDataForEdit } from "@/lib/definitions";
import { cn } from "@/lib/utils";

import { ButtonNewTip } from "@/app/button-new-tip";

import { buttonVariants } from "@/components/ui/button";
import { CardButtonSection } from "@/components/ui/card";

export function CardButtonSectionCustomer({ customer }: { customer: CustomerDataForEdit }) {
  return (
    <CardButtonSection className="gris">
      <Link href={`/${customer.carPlate}`} className={cn(buttonVariants({ size: "sm" }))}>
        Ver Propinas
      </Link>
      <ButtonNewTip customer={customer} />
    </CardButtonSection>
  );
}
