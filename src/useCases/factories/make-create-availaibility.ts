import { CreateAvailaibilityUseCase } from '../create-availaibility'
import { PrismaAvailaibilityRepository } from '../repositories/prisma/prisma-availaibility-repository'

export function MakeCreateAvailaibility() {
  const prismaAvailaibilityRepository = new PrismaAvailaibilityRepository()
  const createAvailaibilityUseCase = new CreateAvailaibilityUseCase(
    prismaAvailaibilityRepository,
  )

  return createAvailaibilityUseCase
}
