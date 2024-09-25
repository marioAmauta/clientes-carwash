"use server";

import { Customer, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { editCustomer } from "@/data-access/customer";

import { APP_LINKS, ERROR_MESSAGES, PRISMA_ERROR_CODES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { customerSchema } from "@/lib/schemas";

export async function editCustomerAction({
  data,
  carPlate
}: Pick<Customer, "carPlate"> & { data: unknown }): Promise<ActionReturnType> {
  await verifyUserLoggedIn();

  const customerParsedData = customerSchema.safeParse(data);

  if (!customerParsedData.success) {
    return {
      success: false,
      errors: customerParsedData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  const { carPlate: newCarPlate, customerDescription } = customerParsedData.data;

  try {
    await editCustomer({
      carPlate,
      newCarPlate,
      customerDescription: customerDescription ?? null
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_ERROR_CODES.uniqueConstraint) {
        return {
          success: false,
          message: ERROR_MESSAGES.ALREADY_USED_CAR_PLATE
        };
      }
    }
  }

  revalidatePath(APP_LINKS.HOME_PAGE);
  redirect(APP_LINKS.HOME_PAGE);
}
