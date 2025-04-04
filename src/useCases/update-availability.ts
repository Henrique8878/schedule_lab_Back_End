import { AvailaibilityRepository } from './repositories/availaibility-repository'

interface UpdateAvailabilityUseCaseProps {
  id: string
  status: string
}

export class UpdateAvailabilityUseCase {
  constructor(private availabilityRepository: AvailaibilityRepository) {}

  async execute({ id, status }: UpdateAvailabilityUseCaseProps) {
    const availaibility = await this.availabilityRepository.updateAvailability(
      id,
      status,
    )

    return availaibility
  }
}
