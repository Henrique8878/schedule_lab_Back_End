import { Prisma, Laboratory } from '@prisma/client'

export interface LaboratoriesRepository {
  create(
    data: Prisma.LaboratoryUncheckedCreateInput,
  ): Promise<Laboratory | null>
  findByName(name: string): Promise<Laboratory | null>
  findManyLaboratories(): Promise<Laboratory[] | null>
}
