"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifyUserLoggedIn } from "@/data-access/auth-check";
import { updateProfileInfo } from "@/data-access/user";

import { APP_LINKS, ERROR_MESSAGES } from "@/lib/constants";
import { updateProfileSchemaData } from "@/lib/schemas";

export async function updateProfileInfoAction(data: unknown): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> {
  const { user: loggedInUser } = await verifyUserLoggedIn();

  const profileParsedData = updateProfileSchemaData.safeParse(data);

  if (!profileParsedData.success) {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_DATA
    };
  }

  const { username, userId } = profileParsedData.data;

  const redirectLink = `${APP_LINKS.USER_PAGE}/${username}`;

  if (loggedInUser.id !== userId) {
    return redirect(APP_LINKS.HOME_PAGE);
  }

  await updateProfileInfo({ username, userId: loggedInUser.id });

  revalidatePath(redirectLink);
  redirect(redirectLink);
}
