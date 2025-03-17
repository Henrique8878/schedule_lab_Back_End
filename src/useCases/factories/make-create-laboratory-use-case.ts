import { CreateLaboratoryUseCase } from '../create-laboratory'
import { PrismaLaboratoriesRepository } from '../repositories/prisma/prisma-laboratories-repository'

export function MakeCreateLaboratoryUseCase() {
  const prismaLaboratoriesRepository = new PrismaLaboratoriesRepository()
  const createLaboratoryUseCase = new CreateLaboratoryUseCase(
    prismaLaboratoriesRepository,
  )

  return createLaboratoryUseCase
}
