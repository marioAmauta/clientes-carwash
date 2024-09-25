import { Page } from "@playwright/test";

type TestId = {
  testId: string;
};

type TestIdAndValue = TestId & {
  value: string;
};

export type PlaywrightPage = {
  page: Page;
};

export type UserLoginData = {
  email: string;
  password: string;
};

export type UserRegisterData = UserLoginData & {
  invitationCode: string;
  username: string;
  confirmPassword: string;
};

export type LoginProps = PlaywrightPage & {
  email: TestIdAndValue;
  password: TestIdAndValue;
  submitButton: TestId;
};

export type UserLoginActionProps = PlaywrightPage & {
  user: UserLoginData;
};

export type RegisterProps = LoginProps & {
  invitationCode: TestIdAndValue;
  username: TestIdAndValue;
  confirmPassword: TestIdAndValue;
};

export type UserRegisterActionProps = PlaywrightPage & {
  user: UserRegisterData;
};

export type LogoutProps = PlaywrightPage & {
  logoutTriggerButtonId: TestId;
  logoutButtonId: TestId;
};

export type InvitationCodeData = PlaywrightPage & {
  invitationCode: TestIdAndValue;
  submitButton: TestId;
};

export type UserCreateInvitationCodeActionProps = PlaywrightPage & { invitationCode: string };

export type NewCustomerData = PlaywrightPage & {
  carPlate: TestIdAndValue;
  customerDescription?: TestIdAndValue;
  tip: TestIdAndValue;
  tipComment?: TestIdAndValue;
  optionalToggle?: TestId;
  submitButton: TestId;
};

type TipData = {
  tip: string;
  tipComment?: string;
};

type CustomerData = {
  carPlate: string;
  customerDescription?: string;
};

export type UserCreateNewCustomerActionProps = PlaywrightPage & {
  newCustomer: CustomerData & TipData;
};

export type EditCustomerData = PlaywrightPage &
  Pick<NewCustomerData, "carPlate" | "customerDescription" | "submitButton">;

export type UserEditCustomerActionProps = PlaywrightPage & {
  customer: CustomerData;
};

export type UserSearchActionProps = PlaywrightPage & {
  search: string;
};
