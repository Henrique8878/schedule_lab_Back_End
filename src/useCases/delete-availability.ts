import { AvailaibilityRepository } from './repositories/availaibility-repository'

interface DeleteAvailabilityUseCaseProps {
  id: string
}

export class DeleteAvailabilityUseCase {
  constructor(private availabilityRepository: AvailaibilityRepository) {}

  async execute({ id }: DeleteAvailabilityUseCaseProps) {
    const availability =
      await this.availabilityRepository.deleteAvailability(id)

    return availability
  }
}
