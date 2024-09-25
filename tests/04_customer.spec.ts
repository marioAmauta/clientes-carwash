import { test } from "@playwright/test";

import { APP_LINKS, ERROR_MESSAGES, TEST_IDS } from "@/lib/constants";

import {
  deleteCustomerByCarPlate,
  deleteTipFromCustomerByCarPlate,
  resetDb,
  seedInvitationCode,
  updateInvitationCodeIsUsed
} from "./lib/db";
import {
  adminUser,
  editCustomerMock,
  invitationCode1,
  newCustomerMock,
  newCustomerMock2,
  newUserMock2
} from "./lib/mock-data";
import {
  userCloseToastAction,
  userCreateNewCustomerAction,
  userEditCustomerAction,
  userLoginAction,
  userRegisterAction
} from "./lib/utils";

test("if there are no customers user can see a message with a create new customer button, user can create one customer by clicking the button and then be redirected to home page and see the new customer", async ({
  page
}) => {
  await resetDb();
  await seedInvitationCode({ code: invitationCode1 });
  await page.goto(APP_LINKS.HOME_PAGE);
  await page.getByTestId(TEST_IDS.createAccountLink).click();
  await page.waitForURL(APP_LINKS.CREATE_ACCOUNT_PAGE);
  await userRegisterAction({
    page,
    user: {
      ...adminUser,
      invitationCode: invitationCode1
    }
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await page.getByTestId(TEST_IDS.noCustomersCreateCustomerButton).click();
  await page.waitForURL(APP_LINKS.NEW_CUSTOMER_PAGE);
  await userCreateNewCustomerAction({
    page,
    newCustomer: {
      carPlate: newCustomerMock.carPlate,
      tip: newCustomerMock.tip
    }
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await page.getByText(newCustomerMock.carPlate).isVisible();
});

test("if user send an already created customer, the tip is added to the existing customer correctly", async ({
  page
}) => {
  const newTip = {
    carPlate: newCustomerMock.carPlate,
    tip: "10000",
    tipComment: "Muy buena propina"
  };
  await deleteTipFromCustomerByCarPlate({
    carPlate: newTip.carPlate,
    tipComment: newTip.tipComment
  });
  await page.goto(APP_LINKS.LOGIN_PAGE);
  await userLoginAction({
    page,
    user: adminUser
  });
  await page.getByTestId(TEST_IDS.createNewCustomerHeaderLink).click();
  await userCreateNewCustomerAction({
    page,
    newCustomer: {
      ...newTip
    }
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await page.getByText(newTip.tipComment).isVisible();
});

test("if user has created the customer or the tip then can see options buttons", async ({ page }) => {
  await page.goto(APP_LINKS.LOGIN_PAGE);
  await userLoginAction({
    page,
    user: adminUser
  });
  await page.getByTestId(`${TEST_IDS.customerOptionsButton}${newCustomerMock.carPlate}`).isVisible();
  await page.getByTestId(`${TEST_IDS.tipOptionsButton}${newCustomerMock.carPlate}`).isVisible();
});

test("if user has not created the customer or the tip then can not see options buttons", async ({ page }) => {
  await page.goto(APP_LINKS.HOME_PAGE);
  await updateInvitationCodeIsUsed({ code: invitationCode1, isUsed: false });
  await page.getByTestId(TEST_IDS.createAccountLink).click();
  await userRegisterAction({
    page,
    user: {
      ...newUserMock2,
      invitationCode: invitationCode1
    }
  });
  await page.getByTestId(`${TEST_IDS.customerOptionsButton}${newCustomerMock.carPlate}`).isHidden();
  await page.getByTestId(`${TEST_IDS.tipOptionsButton}${newCustomerMock.carPlate}`).isHidden();
});

test("user cannot update a car plate to one that already exists and see an error message", async ({ page }) => {
  await deleteCustomerByCarPlate({ carPlate: newCustomerMock2.carPlate });
  await page.goto(APP_LINKS.LOGIN_PAGE);
  await userLoginAction({
    page,
    user: adminUser
  });
  await page.getByTestId(TEST_IDS.createNewCustomerHeaderLink).click();
  await userCreateNewCustomerAction({
    page,
    newCustomer: {
      ...newCustomerMock2
    }
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await page.getByTestId(`${TEST_IDS.customerOptionsButton}${newCustomerMock2.carPlate}`).click();
  await page.getByTestId(`${TEST_IDS.customerEditButton}${newCustomerMock2.carPlate}`).click();
  await userEditCustomerAction({
    page,
    customer: {
      carPlate: newCustomerMock.carPlate
    }
  });
  await page.getByText(ERROR_MESSAGES.ALREADY_USED_CAR_PLATE).isVisible();
  await userCloseToastAction({ page });
});

test("user can update customer data correctly", async ({ page }) => {
  await page.goto(APP_LINKS.LOGIN_PAGE);
  await userLoginAction({
    page,
    user: adminUser
  });
  await page.getByTestId(`${TEST_IDS.customerOptionsButton}${newCustomerMock2.carPlate}`).click();
  await page.getByTestId(`${TEST_IDS.customerEditButton}${newCustomerMock2.carPlate}`).click();
  await userEditCustomerAction({
    page,
    customer: {
      carPlate: editCustomerMock.carPlate,
      customerDescription: editCustomerMock.customerDescription
    }
  });
  await page.waitForURL(APP_LINKS.HOME_PAGE);
  await page.getByText(editCustomerMock.carPlate).isVisible();
  await page.getByText(editCustomerMock.customerDescription).isVisible();
});
