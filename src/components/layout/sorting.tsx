"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { SortOptions } from "@/lib/definitions";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SortingOptions = {
  label: string;
  value: SortOptions;
};

export type SortingProps = {
  sortingOptions: SortingOptions[];
};

const sortKey = "sort";

export function Sorting({ sortingOptions }: SortingProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(searchParams.get(sortKey) ?? sortingOptions[0].value);

  function onChange(value: string) {
    setSelected(value);

    const params = new URLSearchParams({ [sortKey]: value });

    push(`${pathname}?${params}`);
  }

  return (
    <Select value={selected} onValueChange={onChange}>
      <SelectTrigger className="w-max">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="center">
        {Object.values(sortingOptions).map(({ value, label }) => (
          <SelectItem key={value} value={value} className="cursor-pointer">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
