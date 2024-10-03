
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()



export default async function (event: any) {
  const body = await readBody(event);
  const newResource = await prisma.resources.create({
      data: {
          name: body.name,
          description: body.description,
          eligibility: body.eligibility,
          cost: body.cost,
          // Add relations if necessary
      },
  });
  return newResource;
};





