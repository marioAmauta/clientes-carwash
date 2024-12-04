import { Customer } from "@prisma/client";
import { useState, useTransition } from "react";

import { deleteCustomerAction } from "@/app/(user)/actions";

export function useEditCustomer({ carPlate }: Pick<Customer, "carPlate">) {
  const [isPending, startTransition] = useTransition();
  const [editCustomer, setEditCustomer] = useState(false);

  function onDeleteCustomer() {
    startTransition(async () => {
      await deleteCustomerAction({ carPlate });
    });
  }

  return {
    isPending,
    editCustomer,
    setEditCustomer,
    onDeleteCustomer
  };
}
