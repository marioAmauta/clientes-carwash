import { PropsWithChildren } from "react";

export function FormButtonContainer({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-2 gap-4 pt-4">{children}</div>;
}
