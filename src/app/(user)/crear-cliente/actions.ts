"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { createCustomer, getCustomerIdByCarPlate } from "@/data-access/customer";
import { createTip } from "@/data-access/tip";

import { APP_LINKS, ERROR_MESSAGES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { newCustomerSchema } from "@/lib/schemas";

export async function createCustomerAction({ data }: { data: unknown }): Promise<ActionReturnType> {
  const { user } = await verifyUserLoggedIn();

  const newCustomerParsedData = newCustomerSchema.safeParse(data);

  if (!newCustomerParsedData.success) {
    return {
      success: false,
      errors: newCustomerParsedData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  const { carPlate, customerDescription, tip, tipComment } = newCustomerParsedData.data;

  const foundCustomer = await getCustomerIdByCarPlate({ carPlate });

  if (foundCustomer) {
    await createTip({
      createdById: user.id,
      customerId: foundCustomer.id,
      tip,
      tipComment
    });
  } else {
    await createCustomer({
      createdById: user.id,
      carPlate,
      customerDescription,
      tip,
      tipComment
    });
  }

  revalidatePath(APP_LINKS.HOME_PAGE);
  redirect(APP_LINKS.HOME_PAGE);
}
