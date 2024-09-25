import { Customer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { APP_LINKS } from "@/lib/constants";

import { deleteCustomerAction } from "@/app/(user)/actions";

export function useEditCustomer({ carPlate }: Pick<Customer, "carPlate">) {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  function onEditCustomer() {
    const params = new URLSearchParams({ carPlate });

    push(`${APP_LINKS.EDIT_CUSTOMER_PAGE}?${params}`);
  }

  function onDeleteCustomer() {
    startTransition(async () => {
      await deleteCustomerAction({ carPlate });
    });
  }

  return {
    isPending,
    onEditCustomer,
    onDeleteCustomer
  };
}
