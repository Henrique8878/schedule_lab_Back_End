import { Availability } from '@prisma/client'
import { AvailabilityAlreadyExists } from './errors/availaibility-already-exists'
import { AvailaibilityRepository } from './repositories/availaibility-repository'

interface CreateAvailaibilityParams {
  id?: string
  date: Date
  created_at?: Date
  beginHour: Date
  endHour: Date
  laboratoryId: string
  userId: string
  visibility: string
}

interface CreateAvailaibilityReturn {
  newAvailaibility: Availability | null
}
export class CreateAvailaibilityUseCase {
  constructor(private availaibilityRepository: AvailaibilityRepository) {}

  async execute({
    id,
    date,
    created_at,
    beginHour,
    endHour,
    laboratoryId,
    userId,
    visibility,
  }: CreateAvailaibilityParams): Promise<CreateAvailaibilityReturn> {
    const newAvailaibility = await this.availaibilityRepository.create({
      id,
      date,
      created_at,
      beginHour,
      endHour,
      laboratoryId,
      userId,
      visibility,
    })

    if (newAvailaibility === null) {
      throw new AvailabilityAlreadyExists()
    }

    return {
      newAvailaibility,
    }
  }
}
