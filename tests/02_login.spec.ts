import { expect, test } from "@playwright/test";

import { APP_LINKS, ERROR_MESSAGES, TEST_IDS, USER_SESSION_COOKIE_NAME } from "@/lib/constants";

import { fakeCredentials, newUserMock } from "./lib/mock-data";
import { userLogoutAction, userLoginAction } from "./lib/utils";

test.beforeEach(async ({ page }) => {
  await page.goto(APP_LINKS.HOME_PAGE);
  await page.waitForURL(APP_LINKS.LOGIN_PAGE);
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});

test("if user is not logged in cannot see homepage and is redirected to login page", async ({ page }) => {
  await page.waitForURL(APP_LINKS.LOGIN_PAGE);
});

test("user can login and logout and is redirected to login page after logout", async ({ page }) => {
  await userLoginAction({
    page,
    user: newUserMock
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  expect((await page.context().cookies()).map((cookie) => cookie.name)).toContain(USER_SESSION_COOKIE_NAME);
  await page.getByTestId(TEST_IDS.userMenuButtonTrigger).click();
  await userLogoutAction({ page });
  await page.waitForURL(APP_LINKS.LOGIN_PAGE);
  expect((await page.context().cookies()).map((cookie) => cookie.name)).not.toContain(USER_SESSION_COOKIE_NAME);
});

test("if user send a wrong email will get a credentials error message and persist in login page", async ({ page }) => {
  await userLoginAction({
    page,
    user: {
      ...newUserMock,
      email: fakeCredentials.fakeEmail
    }
  });
  await page.waitForURL(APP_LINKS.LOGIN_PAGE);
  await page.getByText(ERROR_MESSAGES.INVALID_CREDENTIALS).isVisible();
});

test("if user send a wrong password will get a credentials error message and persist in login page", async ({
  page
}) => {
  await userLoginAction({
    page,
    user: {
      ...newUserMock,
      password: fakeCredentials.fakePassword
    }
  });
  await page.waitForURL(APP_LINKS.LOGIN_PAGE);
  await page.getByText(ERROR_MESSAGES.INVALID_CREDENTIALS).isVisible();
});
