import { TEST_IDS } from "@/lib/constants";

import {
  InvitationCodeData,
  LoginProps,
  UserLoginActionProps,
  LogoutProps,
  NewCustomerData,
  PlaywrightPage,
  RegisterProps,
  UserRegisterActionProps,
  UserCreateInvitationCodeActionProps,
  UserCreateNewCustomerActionProps,
  EditCustomerData,
  UserEditCustomerActionProps,
  UserSearchActionProps
} from "./definitions";

export async function userCloseToastAction({ page }: PlaywrightPage) {
  await page.getByLabel("Close toast").click();
}

async function register({
  page,
  invitationCode,
  username,
  email,
  password,
  confirmPassword,
  submitButton
}: RegisterProps) {
  await page.getByTestId(invitationCode.testId).fill(invitationCode.value);
  await page.getByTestId(username.testId).fill(username.value);
  await page.getByTestId(email.testId).fill(email.value);
  await page.getByTestId(password.testId).fill(password.value);
  await page.getByTestId(confirmPassword.testId).fill(confirmPassword.value);
  await page.getByTestId(submitButton.testId).click();
}

export async function userRegisterAction({ page, user }: UserRegisterActionProps) {
  await register({
    page,
    invitationCode: {
      testId: TEST_IDS.registerForm.invitationCode,
      value: user.invitationCode
    },
    username: {
      testId: TEST_IDS.registerForm.username,
      value: user.username
    },
    email: {
      testId: TEST_IDS.registerForm.email,
      value: user.email
    },
    password: {
      testId: TEST_IDS.registerForm.password,
      value: user.password
    },
    confirmPassword: {
      testId: TEST_IDS.registerForm.confirmPassword,
      value: user.confirmPassword
    },
    submitButton: {
      testId: TEST_IDS.registerForm.submitButton
    }
  });
}

async function login({ page, email, password, submitButton }: LoginProps) {
  await page.getByTestId(email.testId).fill(email.value);
  await page.getByTestId(password.testId).fill(password.value);
  await page.getByTestId(submitButton.testId).click();
}

export async function userLoginAction({ page, user }: UserLoginActionProps) {
  await login({
    page,
    email: {
      testId: TEST_IDS.loginForm.email,
      value: user.email
    },
    password: {
      testId: TEST_IDS.loginForm.password,
      value: user.password
    },
    submitButton: {
      testId: TEST_IDS.loginForm.submitButton
    }
  });
}

async function logout({ page, logoutTriggerButtonId, logoutButtonId }: LogoutProps) {
  await page.getByTestId(logoutTriggerButtonId.testId).click();
  await page.getByTestId(logoutButtonId.testId).click();
}

export async function userLogoutAction({ page }: PlaywrightPage) {
  await logout({
    page,
    logoutTriggerButtonId: {
      testId: TEST_IDS.logoutButtonTrigger
    },
    logoutButtonId: {
      testId: TEST_IDS.logoutButton
    }
  });
}

async function createInvitationCode({ page, invitationCode, submitButton }: InvitationCodeData) {
  await page.getByTestId(invitationCode.testId).fill(invitationCode.value);
  await page.getByTestId(submitButton.testId).click();
}

export async function userCreateInvitationCodeAction({ page, invitationCode }: UserCreateInvitationCodeActionProps) {
  await createInvitationCode({
    page,
    invitationCode: {
      testId: TEST_IDS.formInvitationCode.invitationCode,
      value: invitationCode
    },
    submitButton: {
      testId: TEST_IDS.formInvitationCode.submitButton
    }
  });
}

async function createNewCustomer({
  page,
  carPlate,
  customerDescription,
  tip,
  tipComment,
  submitButton
}: NewCustomerData) {
  await page.getByTestId(carPlate.testId).fill(carPlate.value);

  if (customerDescription) {
    await page.getByTestId(customerDescription.testId).fill(customerDescription.value);
  }

  await page.getByTestId(tip.testId).fill(tip.value);

  if (tipComment) {
    await page.getByTestId(tipComment.testId).fill(tipComment.value);
  }

  await page.getByTestId(submitButton.testId).click();
}

export async function userCreateNewCustomerAction({ page, newCustomer }: UserCreateNewCustomerActionProps) {
  await createNewCustomer({
    page,
    carPlate: {
      testId: TEST_IDS.customerForm.carPlate,
      value: newCustomer.carPlate
    },
    customerDescription: {
      testId: TEST_IDS.customerForm.description,
      value: newCustomer.customerDescription ?? ""
    },
    tip: {
      testId: TEST_IDS.customerForm.tip,
      value: newCustomer.tip
    },
    tipComment: {
      testId: TEST_IDS.customerForm.comment,
      value: newCustomer.tipComment ?? ""
    },
    submitButton: {
      testId: TEST_IDS.customerForm.submitButton
    }
  });
}

async function editCustomer({ page, carPlate, customerDescription, submitButton }: EditCustomerData) {
  await page.getByTestId(carPlate.testId).fill(carPlate.value);

  if (customerDescription) {
    await page.getByTestId(customerDescription.testId).fill(customerDescription.value);
  }

  await page.getByTestId(submitButton.testId).click();
}

export async function userEditCustomerAction({ page, customer }: UserEditCustomerActionProps) {
  await page.getByTestId(TEST_IDS.customerForm.carPlate).clear();
  await editCustomer({
    page,
    carPlate: {
      testId: TEST_IDS.customerForm.carPlate,
      value: customer.carPlate
    },
    customerDescription: {
      testId: TEST_IDS.customerForm.description,
      value: customer.customerDescription ?? ""
    },
    submitButton: {
      testId: TEST_IDS.customerForm.submitButton
    }
  });
}

export async function userSearchCustomerAction({ page, search }: UserSearchActionProps) {
  await page.getByTestId(TEST_IDS.searchButtonTrigger).click();
  await page.getByTestId(TEST_IDS.searchForm.search).fill(search);
  await page.getByTestId(TEST_IDS.searchForm.submitButton).click();
}
