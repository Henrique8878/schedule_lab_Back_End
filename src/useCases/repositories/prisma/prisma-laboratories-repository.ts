import { prisma } from '@/lib/prisma'
import { Laboratory, Prisma } from '@prisma/client'
import { LaboratoriesRepository } from '../laboratories-repository'

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

  async findManyLaboratories(page: number) {
    const laboratories = await prisma.laboratory.findMany({
      take: 10,
      skip: (page - 1) * 10,
      include: {
        reservations: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    const totalCount = await prisma.laboratory.count()
    return {
      laboratories,
      totalCount,
    }
  }

  async findLabById(labId: string): Promise<Laboratory | null> {
    const laboratory = await prisma.laboratory.findUnique({
      where: {
        id: labId,
      },
    })

    if (!laboratory) {
      return null
    }

    return laboratory
  }

  async deleteLab(labId: string) {
    const lab = await prisma.laboratory.delete({
      where: {
        id: labId,
      },
      include: {
        reservations: true,
      },
    })

    return lab
  }

  async updateLab(
    id: string,
    data: Prisma.LaboratoryUncheckedUpdateInput,
  ): Promise<Laboratory | null> {
    const laboratory = await prisma.laboratory.update({
      where: {
        id,
      },
      data,
    })

    return laboratory
  }
}
