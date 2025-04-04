import { DeleteAvailabilityUseCase } from '../delete-availability'
import { PrismaAvailaibilityRepository } from '../repositories/prisma/prisma-availaibility-repository'

export function MakeDeleteAvailability() {
  const prismaAvailabilityRepository = new PrismaAvailaibilityRepository()
  const deleteUseCase = new DeleteAvailabilityUseCase(
    prismaAvailabilityRepository,
  )
  return deleteUseCase
}
