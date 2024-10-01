import { PropsWithChildren } from "react";

import { Card } from "@/components/ui/card";

export function FormCard({ children }: PropsWithChildren) {
  return <Card className="mx-auto max-w-md space-y-2 p-4 pb-8 text-inherit">{children}</Card>;
}
