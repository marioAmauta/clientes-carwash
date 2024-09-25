import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type TypographyProps = PropsWithChildren<{ className?: string }>;

function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  );
}

function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {children}
    </h2>
  );
}

function TypographyH3({ children, className }: TypographyProps) {
  return <h3 className={cn("scroll-m-20 text-center text-2xl font-semibold tracking-tight", className)}>{children}</h3>;
}

function TypographyLead({ children, className }: TypographyProps) {
  return <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>;
}

function TypographyP({ children, className }: TypographyProps) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>;
}

export { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyP };
