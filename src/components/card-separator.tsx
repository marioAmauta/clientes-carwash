import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

export function CardSeparator({ className }: { className?: string }) {
  return (
    <div className={cn("py-3", className)}>
      <Separator />
    </div>
  );
}
