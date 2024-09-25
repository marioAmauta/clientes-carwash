import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "alice@prisma.io";

  const hashedPassword = await hash("password", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      role: "admin",
      hashedPassword,
      username: "alice"
    }
  });

  const carPlate = "ABC123";

  const customer = await prisma.customer.upsert({
    where: { carPlate },
    update: {},
    create: {
      carPlate,
      customerDescription: "Cliente de prueba",
      createdById: user.id
    }
  });

  for (let i = 0; i < 99; i++) {
    await prisma.tip.create({
      data: {
        tip: Number((Math.random() * 10000).toFixed()),
        createdById: user.id,
        customerId: customer.id
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
