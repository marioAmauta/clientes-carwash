import "server-only";

import { prisma } from "@/db";
import { Tip } from "@prisma/client";
import { cache } from "react";

import { PaginationArgs, TipSchemaType } from "@/lib/definitions";
import { getSortOption } from "@/lib/utils";

import { CardTipWithCustomerInfoData } from "@/components/card-tip-with-customer-info";

import { verifyUserLoggedIn } from "./auth-check";

export const getTotalTips = cache(async () => {
  await verifyUserLoggedIn();

  return await prisma.tip.count();
});

export async function createTip({
  customerId,
  createdById,
  tip,
  tipComment
}: TipSchemaType & Pick<Tip, "customerId" | "createdById">) {
  await verifyUserLoggedIn();

  return await prisma.tip.create({
    data: {
      customerId,
      createdById,
      tip: Number(tip),
      tipComment
    }
  });
}

export async function editTip({ id, tip, tipComment }: TipSchemaType & Pick<Tip, "id">) {
  await verifyUserLoggedIn();

  return await prisma.tip.update({
    where: { id },
    data: {
      tip: Number(tip),
      tipComment
    },
    select: {
      tip: true,
      tipComment: true
    }
  });
}

export async function deleteTip({ id }: Pick<Tip, "id">) {
  await verifyUserLoggedIn();

  return await prisma.tip.delete({
    where: { id },
    select: { id: true }
  });
}

export const getTipById = cache(async ({ id }: Pick<Tip, "id">) => {
  await verifyUserLoggedIn();

  return await prisma.tip.findUnique({
    where: { id },
    select: {
      id: true,
      tip: true,
      tipComment: true
    }
  });
});

export const getCardTipWithCustomerInfo = cache(
  async ({ skip, take, sort }: PaginationArgs): Promise<CardTipWithCustomerInfoData[]> => {
    await verifyUserLoggedIn();

    return await prisma.tip.findMany({
      skip,
      take,
      orderBy: getSortOption(sort),
      select: {
        id: true,
        tip: true,
        tipComment: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true
          }
        },
        customer: {
          select: {
            carPlate: true,
            customerDescription: true,
            createdAt: true,
            createdById: true
          }
        }
      }
    });
  }
);

export const getTipsCreatedByUserWithCustomerInfo = cache(
  async ({
    createdById,
    skip,
    take,
    sort
  }: PaginationArgs & Pick<Tip, "createdById">): Promise<CardTipWithCustomerInfoData[]> => {
    await verifyUserLoggedIn();

    return await prisma.tip.findMany({
      where: { createdById },
      skip,
      take,
      orderBy: getSortOption(sort),
      select: {
        id: true,
        tip: true,
        tipComment: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true
          }
        },
        customer: {
          select: {
            id: true,
            carPlate: true,
            customerDescription: true,
            createdAt: true,
            createdById: true
          }
        }
      }
    });
  }
);

export const getTipsCreatedByUserCount = cache(async ({ createdById }: Pick<Tip, "createdById">) => {
  await verifyUserLoggedIn();

  return await prisma.tip.count({
    where: { createdById }
  });
});
