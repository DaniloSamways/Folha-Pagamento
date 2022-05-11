import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default async function handler(req, res) {
  let editData = await prisma.tabelas.update({
      where: {
          id: 1
      },
      data: {
          TINSS1: parseFloat(req.body.tinss1),
          TINSS2: parseFloat(req.body.tinss2),
          TINSS3: parseFloat(req.body.tinss3),
          TINSS4: parseFloat(req.body.tinss4),
          AINSS1: parseFloat(req.body.ainss1),
          AINSS2: parseFloat(req.body.ainss2),
          AINSS3: parseFloat(req.body.ainss3),
          AINSS4: parseFloat(req.body.ainss4),
          TSF: parseFloat(req.body.tsf),
          VSF: parseFloat(req.body.vsf),
          TIRRF1: parseFloat(req.body.tirrf1),
          TIRRF2: parseFloat(req.body.tirrf2),
          TIRRF3: parseFloat(req.body.tirrf3),
          TIRRF4: parseFloat(req.body.tirrf4),
          AIRRF2: parseFloat(req.body.airrf2),
          AIRRF3: parseFloat(req.body.airrf3),
          AIRRF4: parseFloat(req.body.airrf4),
          AIRRF5: parseFloat(req.body.airrf5),
          DIRRF2: parseFloat(req.body.dirrf2),
          DIRRF3: parseFloat(req.body.dirrf3),
          DIRRF4: parseFloat(req.body.dirrf4),
          DIRRF5: parseFloat(req.body.dirrf5),
          DEDPDEP: parseFloat(req.body.dedpdep),
      }
  });
  
  res.json(editData);
}
