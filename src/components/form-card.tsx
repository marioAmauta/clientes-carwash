import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

type FormCardProps = PropsWithChildren<{
  className?: string;
}>;

export function FormCard({ children, className }: FormCardProps) {
  return <Card className={cn("mx-auto max-w-md space-y-2 p-4 pb-8 text-inherit", className)}>{children}</Card>;
}
