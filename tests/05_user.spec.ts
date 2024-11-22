import test from "@playwright/test";

import { APP_LINKS, TEST_IDS } from "@/lib/constants";

import { resetCustomers, resetUsers } from "./lib/db";
import { adminUser, fakeCredentials, newCustomerMock } from "./lib/mock-data";
import {
  userCreateNewCustomerAction,
  userLoginAction,
  userRegisterAction,
  userSearchCustomerAction
} from "./lib/utils";

test("if user search for a not existing customer is redirected to customer detail page with an action message to create a new customer", async ({
  page
}) => {
  await resetCustomers();
  await page.goto(APP_LINKS.LOGIN_PAGE);
  await userLoginAction({
    page,
    user: adminUser
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await userSearchCustomerAction({
    page,
    search: newCustomerMock.carPlate
  });
  await page.waitForURL(`/${newCustomerMock.carPlate}`);
  await page.getByTestId(TEST_IDS.createNewCustomerLinkButton).isVisible();
});

test("if user search for an existing customer is redirected to customer detail page with the found customer info", async ({
  page
}) => {
  await page.goto(APP_LINKS.LOGIN_PAGE);
  await userLoginAction({
    page,
    user: adminUser
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await page.getByTestId(TEST_IDS.createNewCustomerHeaderLink).click();
  await userCreateNewCustomerAction({
    page,
    newCustomer: newCustomerMock
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await userSearchCustomerAction({
    page,
    search: newCustomerMock.carPlate
  });
  await page.waitForURL(`/${newCustomerMock.carPlate}`);
  await page.getByTestId(newCustomerMock.carPlate).isVisible();
});

test("user can update its profile info", async ({ page }) => {
  await resetUsers();

  await page.goto(APP_LINKS.CREATE_ACCOUNT_PAGE);

  await userRegisterAction({
    page,
    user: {
      ...adminUser,
      invitationCode: fakeCredentials.fakeInvitationCode
    }
  });

  await page.waitForURL(APP_LINKS.HOME_PAGE);

  await page.getByTestId(TEST_IDS.userMenuButtonTrigger).click();
  await page.getByTestId(TEST_IDS.profileButton).click();

  await page.waitForURL(`${APP_LINKS.USER_PAGE}/${adminUser.username}`);

  await page.getByTestId(TEST_IDS.editProfileButton).click();

  const newUserName = "new-username";

  await page.getByTestId(TEST_IDS.updateProfileForm.username).fill(newUserName);
  await page.getByTestId(TEST_IDS.updateProfileForm.submitButton).click();

  await page.getByText(newUserName).isVisible();
});
