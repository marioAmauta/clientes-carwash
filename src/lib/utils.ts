import { format } from "@formkit/tempo";
import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { SearchParams, SortOptions } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getChileanMoneyFormat(data: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(data);
}

export function getChileanDateFormat(data: Date) {
  return format({
    date: data,
    format: {
      date: "full",
      time: "short"
    },
    locale: "es",
    tz: "America/Santiago"
  });
}

export function getSortOption(sort: SortOptions) {
  const createdAtDesc = { createdAt: Prisma.SortOrder.desc };
  const createdAtAsc = { createdAt: Prisma.SortOrder.asc };

  switch (sort) {
    case "newest":
      return createdAtDesc;
    case "oldest":
      return createdAtAsc;
    case "highest":
      return [{ tip: Prisma.SortOrder.desc }, createdAtDesc];
    case "lowest":
      return [{ tip: Prisma.SortOrder.asc }, createdAtDesc];
    default:
      return {};
  }
}

export async function generatePaginationParams(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = searchParams.limit ? Number(searchParams.limit) : 6;
  const sort = (searchParams.sort ? searchParams.sort : ("newest" as SortOptions)) as SortOptions;

  const start = (page - 1) * limit;
  const end = start + limit;

  return { page, limit, sort, start, end };
}

export function eventPreventDefault(event: Event) {
  event.preventDefault();
}

export function range({ start, stop, step = 1 }: { start: number; stop: number; step?: number }) {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}
