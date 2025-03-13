import { PrismaClient, RoleType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles: RoleType[] = ["ADMIN", "MEMBER", "OWNER", "USER"];
  for (const role of roles) {
    const roleExists = await prisma.role.findFirst({
      where: {
        role: role,
      },
    });
    await prisma.role.upsert({
      where: {
        id: roleExists?.id ?? "",
      },
      create: {
        role: role,
      },
      update: {},
    });
  }
  console.log("Success seeding roles");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
