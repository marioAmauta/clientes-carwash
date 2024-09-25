import { PropsWithChildren } from "react";

export function ListGrid({ children }: PropsWithChildren) {
  return <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>;
}
