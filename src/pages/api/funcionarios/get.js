import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default async function handler(req, res) {
  let allUsers = await prisma.funcionarios.findMany({
      where: {
          nome: {
            startsWith: req.query.nome
          }
      }
  });
  
  res.json(allUsers);
}
