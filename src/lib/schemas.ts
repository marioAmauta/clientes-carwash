import { z } from "zod";

import { TEST_IDS, ERROR_MESSAGES } from "./constants";

const trimmedString = z.string().trim();

const trimmedOptionalString = trimmedString.optional();

export const invitationCodeSchema = trimmedString.min(6, { message: ERROR_MESSAGES.INVALID_INVITATION_CODE });

const usernameSchema = trimmedString
  .min(1, { message: ERROR_MESSAGES.USERNAME_FORM_ERROR })
  .max(25, ERROR_MESSAGES.USERNAME_FORM_ERROR_MAX);

const emailSchema = trimmedString.email({ message: ERROR_MESSAGES.EMAIL_FORM_ERROR });

const passwordSchema = trimmedString.min(4, { message: ERROR_MESSAGES.PASSWORD_FORM_ERROR });

export const newInvitationCodeSchema = z.object({
  invitationCode: invitationCodeSchema
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const registerSchema = z
  .object({
    invitationCode: invitationCodeSchema,
    username: usernameSchema,
    confirmPassword: passwordSchema
  })
  .merge(loginSchema)
  .refine((data) => data.password === data.confirmPassword, {
    path: [TEST_IDS.registerForm.confirmPassword],
    message: ERROR_MESSAGES.CONFIRM_PASSWORD_FORM_ERROR
  });

export const customerSchema = z.object({
  carPlate: trimmedString
    .min(5, { message: ERROR_MESSAGES.INVALID_CAR_PLATE.MIN })
    .max(6, { message: ERROR_MESSAGES.INVALID_CAR_PLATE.MAX })
    .toUpperCase(),
  customerDescription: trimmedOptionalString
});

export const tipSchema = z.object({
  tip: trimmedString.min(1, { message: ERROR_MESSAGES.INVALID_TIP }),
  tipComment: trimmedOptionalString
});

export const newCustomerSchema = z.object({}).merge(customerSchema).merge(tipSchema);

export const searchCarPlateSchema = customerSchema.pick({ carPlate: true });

export const updateProfileSchemaData = z.object({ userId: trimmedString, username: usernameSchema });

export const updateProfileSchemaForm = z.object({ username: usernameSchema });
