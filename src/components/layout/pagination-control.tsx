"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { cn, range } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type PaginationControlProps = {
  start: number;
  end: number;
  page: number;
  limit: number;
  totalItems: number;
};

export function PaginationControl({ start, end, page, limit, totalItems }: PaginationControlProps) {
  const searchKey = "page";

  const { back, push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsObject = Object.fromEntries(searchParams);

  const [selectedPage, setSelectedPage] = useState(searchParams.get(searchKey) ?? "1");

  const hasNextPage = end < totalItems;
  const hasPreviousPage = start > 0;
  const availablePages = range({ start: 1, stop: Math.ceil(totalItems / limit) });

  function onSelectChange(value: string) {
    setSelectedPage(value);

    const params = new URLSearchParams(searchParams);
    params.set(searchKey, value);

    push(`${pathname}?${params}`);
  }

  useEffect(() => {
    const lastPage = availablePages[availablePages.length - 1];
    const isPageGreaterThanLastPage = page > lastPage;
    const isLimitGreaterThanTotalItems = limit > totalItems;

    if (isPageGreaterThanLastPage || (isPageGreaterThanLastPage && isLimitGreaterThanTotalItems)) {
      return back();
    }

    setSelectedPage(String(page));
  }, [page, availablePages, limit, totalItems, back]);

  return (
    <Pagination className={cn("hidden pb-12", totalItems > limit && "flex")}>
      <PaginationContent className="grid grid-cols-3 place-items-center">
        {hasPreviousPage ? (
          <PaginationItem>
            <PaginationPrevious href={{ pathname, query: { ...searchParamsObject, page: page - 1, limit } }} />
          </PaginationItem>
        ) : (
          <li className="pointer-events-none select-none" />
        )}
        <Select value={selectedPage} onValueChange={onSelectChange}>
          <SelectTrigger className="w-max">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="center" className="z-50">
            {availablePages.map((n) => (
              <SelectItem key={n} value={String(n)} className="cursor-pointer">
                {`Página ${n}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasNextPage ? (
          <PaginationItem>
            <PaginationNext href={{ pathname, query: { ...searchParamsObject, page: page + 1, limit } }} />
          </PaginationItem>
        ) : (
          <li className="pointer-events-none select-none" />
        )}
      </PaginationContent>
    </Pagination>
  );
}
