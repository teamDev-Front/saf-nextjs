// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Verificar se o admin já existe
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@armwrestling.com' }
  });
  
  if (!adminExists) {
    // Criar usuário admin
    const hashedPassword = await bcrypt.hash('Admin@25', 10);
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@armwrestling.com',
        password: hashedPassword,
        is_admin: true
      }
    });
    console.log('Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });