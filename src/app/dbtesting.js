const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const newTest = await prisma.test.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  });
  console.log('New Test:', newTest);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });