import { Availability, Prisma } from '@prisma/client'

export interface AvailaibilityRepository {
  create(
    data: Prisma.AvailabilityUncheckedCreateInput,
  ): Promise<Availability | null>

  findByDate(
    beginHour: Date,
    laboratoryId: string,
  ): Promise<Availability | null>

  findManyAvailability(page: number): Promise<{
    availability: Availability[]
    availabilityInMonth: number
    totalCount: number
  }>

  deleteAvailability(id: string): Promise<Availability>

  updateAvailability(id: string, status: string): Promise<Availability>
}
