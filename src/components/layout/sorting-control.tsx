import { Sorting, SortingProps } from "./sorting";

type SortingControlProps = {
  label: string;
  start: number;
  end: number;
  totalItems: number;
} & SortingProps;

export function SortingControl({ label, start, end, totalItems, sortingOptions }: SortingControlProps) {
  return (
    <div className="flex items-center justify-between gap-4 md:flex-row md:items-center">
      <p>{`${start + 1}-${end > totalItems ? end - (end - totalItems) : end} de ${totalItems} ${label}`}</p>
      {totalItems > 1 ? <Sorting sortingOptions={sortingOptions} /> : null}
    </div>
  );
}
