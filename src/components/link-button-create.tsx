import { Plus } from "lucide-react";
import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

interface LinkButtonProps extends LinkProps {
  label: string;
  testId?: string;
  className?: string;
}

export function LinkButtonCreate({ href, label, testId, className }: LinkButtonProps) {
  return (
    <Link href={href} data-testid={testId} className={cn(buttonVariants(), "gap-2 bg-green-500", className)}>
      <Plus size="1.2rem" />
      <span>{label}</span>
    </Link>
  );
}
