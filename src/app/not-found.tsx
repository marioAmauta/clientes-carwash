import Link from "next/link";

import { APP_LINKS } from "@/lib/constants";

import { buttonVariants } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <>
      <TypographyH1>Página no encontrada</TypographyH1>
      <div className="mx-auto w-fit">
        <Link href={APP_LINKS.HOME_PAGE} className={buttonVariants()}>
          Volver al inicio
        </Link>
      </div>
    </>
  );
}
