"use server";

import { Customer, Prisma, Tip } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { deleteCustomer } from "@/data-access/customer";
import { deleteTip } from "@/data-access/tip";

import { APP_LINKS } from "@/lib/constants";

export async function deleteCustomerAction({ carPlate }: Pick<Customer, "carPlate">) {
  await verifyUserLoggedIn();

  try {
    await deleteCustomer({ carPlate });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return error.message;
    }
  }

  revalidatePath(APP_LINKS.HOME_PAGE);
}

export async function deleteTipAction({ id }: Pick<Tip, "id">) {
  await verifyUserLoggedIn();

  const deletedTip = await deleteTip({ id });

  if (!deletedTip) {
    return {
      success: false
    };
  }

  revalidatePath(APP_LINKS.HOME_PAGE);
}
