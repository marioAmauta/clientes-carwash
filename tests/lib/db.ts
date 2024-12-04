import { PrismaClient } from "@prisma/client";

import { Roles } from "@/lib/definitions";

function prismaClientSingleton() {
  return new PrismaClient();
}

declare global {
  // eslint-disable-next-line no-var
  var prismaTest: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaTest = globalThis.prismaTest ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaTest = prismaTest;
}

export async function resetDb() {
  await resetUsers();
  await resetInvitationCodes();
  await resetCustomers();
  await prismaTest.session.deleteMany();
  await prismaTest.tip.deleteMany();
}

export async function resetUsers() {
  await prismaTest.user.deleteMany();
}

export async function resetInvitationCodes() {
  await prismaTest.invitationCode.deleteMany();
}

export async function resetCustomers() {
  await prismaTest.customer.deleteMany();
}

export async function deleteTipFromCustomerByCarPlate({
  carPlate,
  tipComment
}: {
  carPlate: string;
  tipComment: string;
}) {
  await prismaTest.tip.deleteMany({
    where: {
      customer: {
        carPlate
      },
      tipComment
    }
  });
}

export async function updateInvitationCodeIsUsed({ code, isUsed }: { code: string; isUsed: boolean }) {
  await prismaTest.invitationCode.update({
    where: { code },
    data: { isUsed }
  });
}

export async function seedInvitationCode({ code }: { code: string }) {
  await prismaTest.invitationCode.create({ data: { code } });
}

export async function setUserToAdminByEmail({ email }: { email: string }) {
  await prismaTest.user.update({
    where: {
      email
    },
    data: {
      role: Roles.Admin
    }
  });
}

export async function deleteCustomerByCarPlate({ carPlate }: { carPlate: string }) {
  const foundCustomer = await prismaTest.customer.findMany({
    where: {
      carPlate
    }
  });

  if (!foundCustomer) {
    return;
  }

  await prismaTest.customer.deleteMany({
    where: {
      carPlate
    }
  });
}
