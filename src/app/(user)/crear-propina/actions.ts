"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { createTip } from "@/data-access/tip";

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

  revalidatePath(APP_LINKS.HOME_PAGE);
  redirect(APP_LINKS.HOME_PAGE);
}
