"use client";

import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "@/components/ui/button";

export function FormButtonCancel({ className, children, ...props }: ButtonProps) {
  const { back } = useRouter();

  return (
    <Button type="button" variant="destructive" className={className} onClick={back} {...props}>
      {children ? children : "Cancelar"}
    </Button>
  );
}
