import { Availability, Prisma } from '@prisma/client'

export interface AvailaibilityRepository {
  create(
    data: Prisma.AvailabilityUncheckedCreateInput,
  ): Promise<Availability | null>

  findByDate(
    beginHour: Date,
    laboratoryId: string,
  ): Promise<Availability | null>

  findManyAvailability(): Promise<Availability[] | []>
}
