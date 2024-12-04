import { Customer, Tip } from "@prisma/client";
import { z } from "zod";

import {
  customerSchema,
  forgotPasswordSchema,
  loginSchema,
  newCustomerSchema,
  newInvitationCodeSchema,
  registerSchema,
  resetPasswordSchema,
  searchCarPlateSchema,
  tipSchema,
  updateProfileSchemaData,
  updateProfileSchemaForm
} from "./schemas";

export enum Roles {
  Admin = "admin",
  User = "user",
  Editor = "editor"
}

export type ActionReturnType =
  | {
      success: boolean;
      errors?: Record<string, unknown>;
      message?: string;
    }
  | undefined;

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type NewCustomerSchemaType = z.infer<typeof newCustomerSchema>;

export type CustomerSchemaType = z.infer<typeof customerSchema>;

export type TipSchemaType = z.infer<typeof tipSchema>;

export type NewInvitationCodeSchemaType = z.infer<typeof newInvitationCodeSchema>;

export type SearchCarPlateSchemaType = z.infer<typeof searchCarPlateSchema>;

export type UpdateProfileSchemaDataType = z.infer<typeof updateProfileSchemaData>;

export type UpdateProfileSchemaFormType = z.infer<typeof updateProfileSchemaForm>;

export type Params<T> = Promise<T>;

export type SearchParams<T = { [key: string]: string | string[] | undefined }> = Promise<T>;

export type SortOptions = "newest" | "oldest" | "highest" | "lowest";

export type PaginationArgs = { skip: number; take: number; sort: SortOptions };

export type CustomerDataForEdit = Pick<Customer, "id" | "carPlate" | "customerDescription">;

export type TipDataForEdit = Pick<Tip, "id" | "tip" | "tipComment">;
