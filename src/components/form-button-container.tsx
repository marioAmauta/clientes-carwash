import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { FormButtonCancel } from "./form-button-cancel";

export function FormButtonContainer({
  children,
  withCancelButton
}: PropsWithChildren<{
  withCancelButton?: boolean;
}>) {
  return (
    <div className={cn("mx-auto grid max-w-md gap-4 pt-4", withCancelButton && "grid-cols-2")}>
      {!withCancelButton ? null : <FormButtonCancel />}
      {children}
    </div>
  );
}
