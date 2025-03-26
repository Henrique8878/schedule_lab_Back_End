import { GetManyAvailabilitiesUseCase } from '../get-many-availabilities'
import { PrismaAvailaibilityRepository } from '../repositories/prisma/prisma-availaibility-repository'

export function MakeGetManyAvailabilities() {
  const prismaAvailabilityRepository = new PrismaAvailaibilityRepository()
  const getManyAvailabilities = new GetManyAvailabilitiesUseCase(
    prismaAvailabilityRepository,
  )

  return getManyAvailabilities
}
