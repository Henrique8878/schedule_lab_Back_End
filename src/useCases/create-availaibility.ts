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
  }: CreateAvailaibilityParams): Promise<CreateAvailaibilityReturn> {
    // const availaibility = await this.availaibilityRepository.findByDate(
    //   beginHour,
    //   laboratoryId,
    // )

    // if (availaibility) {
    //   throw new AvailabilityAlreadyExists()
    // }

    const newAvailaibility = await this.availaibilityRepository.create({
      id,
      date,
      created_at,
      beginHour,
      endHour,
      laboratoryId,
    })

    return {
      newAvailaibility,
    }
  }
}
