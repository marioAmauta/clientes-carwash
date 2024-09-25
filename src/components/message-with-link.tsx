import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

type MessageWithLinkProps = {
  messageText: string;
  href: string;
  linkTestId: string;
  linkLabel: string;
};

export function MessageWithLink({ messageText, href, linkTestId, linkLabel }: MessageWithLinkProps) {
  return (
    <div className="space-y-4 py-4 text-center">
      <p>{messageText}</p>
      <Link href={href} data-testid={linkTestId} className={cn(buttonVariants(), "font-semibold text-background")}>
        {linkLabel}
      </Link>
    </div>
  );
}
