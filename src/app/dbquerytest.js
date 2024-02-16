const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const test = await prisma.test.findUnique({
    where: {
      email: 'alice@example.com',
    },
  });
  console.log(test);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });