import { Customer } from "@prisma/client";
import Link from "next/link";

import { APP_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { CardButtonSection } from "@/components/ui/card";

export function CardButtonSectionCustomer({ carPlate }: Pick<Customer, "carPlate">) {
  return (
    <CardButtonSection>
      <Link href={`/${carPlate}`} className={cn(buttonVariants({ size: "sm" }), "max-w-36")}>
        Ver Propinas
      </Link>
      <Link
        href={`${APP_LINKS.NEW_TIP_PAGE}?${new URLSearchParams({ carPlate })}`}
        className={cn(buttonVariants({ size: "sm" }), "max-w-36 bg-green-500")}
      >
        Nueva Propina
      </Link>
    </CardButtonSection>
  );
}
