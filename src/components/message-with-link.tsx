import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { TypographyP } from "./ui/typography";

type MessageWithLinkProps = {
  messageText: string;
  href: string;
  linkTestId: string;
  linkLabel: string;
};

export function MessageWithLink({ messageText, href, linkTestId, linkLabel }: MessageWithLinkProps) {
  return (
    <div className="space-y-4 py-4 text-center">
      <TypographyP>{messageText}</TypographyP>
      <Link href={href} data-testid={linkTestId} className={buttonVariants({ variant: "outline" })}>
        {linkLabel}
      </Link>
    </div>
  );
}
