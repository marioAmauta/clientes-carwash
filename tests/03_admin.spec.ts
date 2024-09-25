import { test, expect } from "@playwright/test";

import { APP_LINKS, SUCCESS_MESSAGES, TEST_IDS, USER_SESSION_COOKIE_NAME } from "@/lib/constants";

import { resetInvitationCodes, seedInvitationCode, setUserToAdminByEmail } from "./lib/db";
import { newUserMock } from "./lib/mock-data";
import { adminUser, invitationCode1 } from "./lib/mock-data";
import { userCloseToastAction, userCreateInvitationCodeAction, userLoginAction } from "./lib/utils";

test.beforeEach(async ({ page }) => {
  await page.goto(APP_LINKS.LOGIN_PAGE);
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});

test("only admin can see invitation code link", async ({ page }) => {
  await userLoginAction({
    page,
    user: newUserMock
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await page.getByTestId(TEST_IDS.createInvitationLink).isHidden();
});

test("admin can create an invitation code successfully", async ({ page }) => {
  await resetInvitationCodes();
  await setUserToAdminByEmail({ email: adminUser.email });
  await userLoginAction({
    page,
    user: adminUser
  });
  await page.getByTestId(TEST_IDS.createInvitationLink).click();
  await page.waitForURL(APP_LINKS.CREATE_INVITATION_CODE_PAGE);
  await userCreateInvitationCodeAction({ page, invitationCode: invitationCode1 });
  await page.waitForURL(APP_LINKS.INVITATION_CODES_PAGE);
  await page.getByText(invitationCode1).isVisible();
});

test("admin can copy an invitation code successfully", async ({ page, context }) => {
  await resetInvitationCodes();
  await seedInvitationCode({ code: invitationCode1 });
  await userLoginAction({ page, user: adminUser });
  await page.getByTestId(TEST_IDS.createInvitationLink).click();
  await page.getByTestId(TEST_IDS.invitationCodeLinkTab).click();
  await page.waitForURL(APP_LINKS.INVITATION_CODES_PAGE);
  await context.grantPermissions(["clipboard-write"]);
  await page.getByTestId(`${TEST_IDS.invitationCodeOptionsButton}${invitationCode1}`).click();
  await page.getByTestId(`${TEST_IDS.invitationCodeCopyButton}${invitationCode1}`).click();
  await page.getByText(SUCCESS_MESSAGES.INVITATION_CODE_COPIED).isVisible();
  await userCloseToastAction({ page });
});

test("admin can delete an invitation code successfully", async ({ page }) => {
  await resetInvitationCodes();
  await seedInvitationCode({ code: invitationCode1 });
  await userLoginAction({ page, user: adminUser });
  await page.getByTestId(TEST_IDS.createInvitationLink).click();
  await page.getByTestId(TEST_IDS.invitationCodeLinkTab).click();
  await page.waitForURL(APP_LINKS.INVITATION_CODES_PAGE);
  await page.getByTestId(`${TEST_IDS.invitationCodeOptionsButton}${invitationCode1}`).click();
  await page.getByTestId(`${TEST_IDS.invitationCodeDeleteButtonTrigger}${invitationCode1}`).click();
  await page.getByTestId(`${TEST_IDS.invitationCodeDeleteButton}${invitationCode1}`).click();
  await page.getByText(SUCCESS_MESSAGES.INVITATION_CODE_DELETED).isVisible();
  await userCloseToastAction({ page });
  await page.getByText(invitationCode1).isHidden();
});
