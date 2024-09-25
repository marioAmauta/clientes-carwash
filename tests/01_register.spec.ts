import { expect, test } from "@playwright/test";

import { APP_LINKS, ERROR_MESSAGES, TEST_IDS, USER_SESSION_COOKIE_NAME } from "@/lib/constants";

import { resetDb, resetInvitationCodes, seedInvitationCode, updateInvitationCodeIsUsed } from "./lib/db";
import { adminUser, fakeCredentials, invitationCode1, newUserMock } from "./lib/mock-data";
import { userRegisterAction } from "./lib/utils";

test.beforeAll(async () => {
  await resetDb();
});

test.beforeEach(async ({ page }) => {
  await resetInvitationCodes();
  await seedInvitationCode({ code: invitationCode1 });
  await page.goto(APP_LINKS.HOME_PAGE);
  await page.getByTestId(TEST_IDS.createAccountLink).click();
  await page.waitForURL(APP_LINKS.CREATE_ACCOUNT_PAGE);
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});

test("the first user do not need a valid invitation code to sign up successfully", async ({ page }) => {
  await userRegisterAction({
    page,
    user: {
      ...adminUser,
      invitationCode: fakeCredentials.fakeInvitationCode
    }
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  expect((await page.context().cookies()).map((cookie) => cookie.name)).toContain(USER_SESSION_COOKIE_NAME);
});

test("the user can sign up with a valid invitation code and then be redirected to home page", async ({ page }) => {
  await userRegisterAction({
    page,
    user: {
      ...newUserMock,
      invitationCode: invitationCode1
    }
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  expect((await page.context().cookies()).map((cookie) => cookie.name)).toContain(USER_SESSION_COOKIE_NAME);
});

test("if user send already used username will get an error message and persist in register page", async ({ page }) => {
  await userRegisterAction({
    page,
    user: {
      ...newUserMock,
      invitationCode: invitationCode1
    }
  });
  await page.waitForURL(APP_LINKS.CREATE_ACCOUNT_PAGE);
  await page.getByText(ERROR_MESSAGES.ALREADY_USED_USERNAME).isVisible();
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});

test("if user send already used email will get an error message and persist in register page", async ({ page }) => {
  await userRegisterAction({
    page,
    user: {
      ...newUserMock,
      invitationCode: invitationCode1,
      username: fakeCredentials.fakeUsername
    }
  });
  await page.waitForURL(APP_LINKS.CREATE_ACCOUNT_PAGE);
  await page.getByText(ERROR_MESSAGES.ALREADY_USED_EMAIL).isVisible();
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});

test("if user send an invalid invitation code will get an error message and persist in register page", async ({
  page
}) => {
  await userRegisterAction({
    page,
    user: {
      ...newUserMock,
      invitationCode: fakeCredentials.fakeInvitationCode
    }
  });
  await page.waitForURL(APP_LINKS.CREATE_ACCOUNT_PAGE);
  await page.getByText(ERROR_MESSAGES.INVALID_INVITATION_CODE).isVisible();
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});

test("if user send an already used invitation code will get an error message  and persist in register page", async ({
  page
}) => {
  await updateInvitationCodeIsUsed({ code: invitationCode1, isUsed: true });
  await userRegisterAction({
    page,
    user: {
      ...newUserMock,
      invitationCode: invitationCode1
    }
  });
  await page.waitForURL(APP_LINKS.CREATE_ACCOUNT_PAGE);
  await page.getByText(ERROR_MESSAGES.ALREADY_USED_INVITATION_CODE).isVisible();
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});
