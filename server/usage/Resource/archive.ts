import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ArchiveResourceUseCase {
  async execute(id: number): Promise<void> {
    await prisma.resource.update({
      where: { id },
      data: { archived: true },
    });
  }
}