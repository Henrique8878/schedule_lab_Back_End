import { prisma } from '@/lib/prisma'
import { LaboratoriesRepository } from '../laboratories-repository'
import { Prisma } from '@prisma/client'

export class PrismaLaboratoriesRepository implements LaboratoriesRepository {
  async create(data: Prisma.LaboratoryUncheckedCreateInput) {
    const laboratory = await prisma.laboratory.create({
      data,
    })

    return laboratory
  }

  async findByName(name: string) {
    const laboratory = await prisma.laboratory.findFirst({
      where: {
        name,
      },
    })

    return laboratory
  }

  async findManyLaboratories() {
    const laboratories = await prisma.laboratory.findMany({
      include: {
        reservations: true,
      },
    })
    return laboratories
  }
}
