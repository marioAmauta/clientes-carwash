import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchParamsUtil() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const router = useRouter();

  function updateSearchParams(value: object) {
    router.replace(`${pathname}?${new URLSearchParams({ ...searchParamsObject, ...value })}`);
  }

  return { searchParamsObject, updateSearchParams };
}
