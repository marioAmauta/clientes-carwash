import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "@/components/ui/button";

interface ButtonLoadingProps extends ButtonProps {
  loading: boolean;
}

export function FormButtonLoading({ loading, disabled, className, children, ...props }: ButtonLoadingProps) {
  return (
    <Button disabled={disabled || loading} className={cn("flex items-center gap-2", className)} {...props}>
      {loading ? <Loader2 className="size-5 animate-spin" /> : null}
      {children}
    </Button>
  );
}
