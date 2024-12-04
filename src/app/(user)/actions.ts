"use server";

import { Customer, Prisma, Tip } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { deleteCustomer } from "@/data-access/customer";
import { createTip, deleteTip, editTip } from "@/data-access/tip";

import { APP_LINKS, ERROR_MESSAGES, PRISMA_ERROR_CODES } from "@/lib/constants";
import { ActionReturnType } from "@/lib/definitions";
import { tipSchema } from "@/lib/schemas";

type CreateTipActionProps = {
  data: unknown;
  customerId: string;
};

export async function createTipAction({ data, customerId }: CreateTipActionProps): Promise<ActionReturnType> {
  const { user } = await verifyUserLoggedIn();

  const tipParsedData = tipSchema.safeParse(data);

  if (!tipParsedData.success) {
    return {
      success: false,
      errors: tipParsedData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  const { tip, tipComment } = tipParsedData.data;

  try {
    await createTip({
      createdById: user.id,
      customerId,
      tip,
      tipComment
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_ERROR_CODES.uniqueConstraint) {
        return {
          success: false,
          message: ERROR_MESSAGES.ALREADY_CREATED_CUSTOMER
        };
      }
    }
  }
}

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

export async function editTipAction({
  data,
  tipId
}: {
  data: unknown;
  tipId: string;
}): Promise<ActionReturnType | undefined> {
  await verifyUserLoggedIn();

  const tipParsedData = tipSchema.safeParse(data);

  if (!tipParsedData.success) {
    return {
      success: false,
      errors: tipParsedData.error.flatten().fieldErrors,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  const { tip, tipComment } = tipParsedData.data;

  const editedTip = await editTip({
    id: tipId,
    tip,
    tipComment
  });

  if (!editedTip) {
    return {
      success: false
    };
  }
}
