import { PrismaAvailaibilityRepository } from '../repositories/prisma/prisma-availaibility-repository'
import { UpdateAvailabilityUseCase } from '../update-availability'

export function MakeUpdateAvailability() {
  const prismaAvailabilityRepository = new PrismaAvailaibilityRepository()
  const updateAvailabilityUseCase = new UpdateAvailabilityUseCase(
    prismaAvailabilityRepository,
  )

  return updateAvailabilityUseCase
}
