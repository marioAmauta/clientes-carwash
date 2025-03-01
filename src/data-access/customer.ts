import "server-only";

import { prisma } from "@/db";
import { Customer } from "@prisma/client";
import { cache } from "react";

import { NewCustomerSchemaType, PaginationArgs } from "@/lib/definitions";
import { getSortOption } from "@/lib/utils";

import { CardCustomerData } from "@/components/card-customer";

import { verifyUserLoggedIn } from "./auth-check";

export const getTotalCustomers = cache(async () => {
  await verifyUserLoggedIn();

  return await prisma.customer.count();
});

export const getCustomers = cache(async ({ skip, take, sort }: PaginationArgs): Promise<CardCustomerData[] | []> => {
  await verifyUserLoggedIn();

  return await prisma.customer.findMany({
    skip,
    take,
    orderBy: getSortOption(sort),
    select: {
      id: true,
      carPlate: true,
      customerDescription: true,
      createdAt: true,
      updatedAt: true,
      createdBy: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
});

export const getCustomersCreatedByUser = cache(
  async ({
    createdById,
    skip,
    take,
    sort
  }: PaginationArgs & Pick<Customer, "createdById">): Promise<CardCustomerData[] | []> => {
    await verifyUserLoggedIn();

    return await prisma.customer.findMany({
      where: {
        createdById
      },
      skip,
      take,
      orderBy: getSortOption(sort),
      select: {
        id: true,
        carPlate: true,
        customerDescription: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }
);

export const getCustomersCreatedByUserCount = cache(async ({ createdById }: Pick<Customer, "createdById">) => {
  await verifyUserLoggedIn();

  return await prisma.customer.count({
    where: { createdById }
  });
});

export const getCustomerWithLastTipByCarPlate = cache(
  async ({
    carPlate
  }: Pick<Customer, "carPlate">): Promise<Pick<Customer, "id" | "carPlate" | "customerDescription"> | null> => {
    await verifyUserLoggedIn();

    const foundCustomer = await prisma.customer.findUnique({
      where: { carPlate },
      select: {
        tips: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            customer: {
              select: {
                id: true,
                carPlate: true,
                customerDescription: true
              }
            }
          }
        }
      }
    });

    if (!foundCustomer) {
      return null;
    }

    return foundCustomer.tips[0].customer;
  }
);

export const getCustomerWithTipsByCarPlate = cache(
  async ({ carPlate, skip, take, sort }: PaginationArgs & Pick<Customer, "carPlate">) => {
    await verifyUserLoggedIn();

    return await prisma.customer.findUnique({
      where: { carPlate },
      select: {
        createdBy: {
          select: {
            id: true,
            name: true
          }
        },
        id: true,
        carPlate: true,
        customerDescription: true,
        createdAt: true,
        tips: {
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
                name: true
              }
            }
          }
        },
        _count: {
          select: {
            tips: true
          }
        }
      }
    });
  }
);

export const getCustomerIdByCarPlate = cache(async ({ carPlate }: Pick<Customer, "carPlate">) => {
  await verifyUserLoggedIn();

  return await prisma.customer.findUnique({
    where: {
      carPlate
    },
    select: {
      id: true,
      customerDescription: true
    }
  });
});

export async function createCustomer({
  createdById,
  carPlate,
  customerDescription,
  tip,
  tipComment
}: NewCustomerSchemaType & Pick<Customer, "createdById">) {
  await verifyUserLoggedIn();

  return await prisma.customer.create({
    data: {
      createdById,
      carPlate,
      customerDescription,
      tips: {
        create: {
          createdById,
          tip: Number(tip),
          tipComment
        }
      }
    }
  });
}

export async function editCustomer({
  id,
  carPlate,
  customerDescription
}: Pick<Customer, "id" | "carPlate" | "customerDescription">) {
  await verifyUserLoggedIn();

  return await prisma.customer.update({
    where: {
      id
    },
    data: {
      carPlate,
      customerDescription
    }
  });
}

export async function updateCustomerDescription({
  id,
  customerDescription
}: Pick<Customer, "id" | "customerDescription">) {
  await verifyUserLoggedIn();

  return await prisma.customer.update({
    where: {
      id
    },
    data: {
      customerDescription
    }
  });
}

export async function deleteCustomer({ carPlate }: Pick<Customer, "carPlate">) {
  await verifyUserLoggedIn();

  return await prisma.customer.delete({
    where: {
      carPlate
    },
    select: {
      carPlate: true
    }
  });
}
