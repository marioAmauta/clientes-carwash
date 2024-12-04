"use server";

import { Customer } from "@prisma/client";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { editCustomer, getCustomerIdByCarPlate } from "@/data-access/customer";

import { ERROR_MESSAGES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { customerSchema } from "@/lib/schemas";

export async function editCustomerAction({
  id,
  data
}: Pick<Customer, "id"> & { data: unknown }): Promise<ActionReturnType> {
  await verifyUserLoggedIn();

  const customerParsedData = customerSchema.safeParse(data);

  if (!customerParsedData.success) {
    return {
      success: false,
      errors: customerParsedData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  const { carPlate, customerDescription } = customerParsedData.data;

  const foundCustomer = await getCustomerIdByCarPlate({ carPlate });

  if (foundCustomer) {
    return {
      success: false,
      message: ERROR_MESSAGES.ALREADY_USED_CAR_PLATE
    };
  }

  const editResult = await editCustomer({
    id,
    carPlate,
    customerDescription: customerDescription ?? null
  });

  return {
    success: true,
    message: editResult.carPlate
  };
}