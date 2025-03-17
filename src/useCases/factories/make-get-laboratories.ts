import { GetLaboretoriesUseCase } from '../get-laboratories'
import { PrismaLaboratoriesRepository } from '../repositories/prisma/prisma-laboratories-repository'

export function MakeGetManyLaboratories() {
  const prismaLaboratoriesRepository = new PrismaLaboratoriesRepository()
  const getManyLaboratories = new GetLaboretoriesUseCase(
    prismaLaboratoriesRepository,
  )

  return getManyLaboratories
}
