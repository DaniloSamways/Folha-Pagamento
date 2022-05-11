import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default async function handler(req, res) {
  let allUsers = await prisma.funcionarios.update({
      where: {
          matricula: req.body.matricula
      },
      data: {
          nome: req.body.nome,
          VT: req.body.vt,
          DEP14: parseInt(req.body.dep14),
          depir: parseInt(req.body.depir),
          salario: parseFloat(req.body.salario)
      }
  });
  
  res.json(allUsers);
}
