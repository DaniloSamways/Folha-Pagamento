import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default async function handler(req, res) {
    let postFunc = await prisma.funcionarios.create({
        data: {
            nome: req.body.nome,
            VT: req.body.vt,
            DEP14: parseInt(req.body.dep14),
            depir: parseInt(req.body.depir),
            salario: parseFloat(req.body.salario)
        }
    }).then(() => res.json(200)).catch(err => res.json(err));
}