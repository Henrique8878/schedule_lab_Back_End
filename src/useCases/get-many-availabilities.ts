import { AvailaibilityRepository } from './repositories/availaibility-repository'

interface GetManyAvailabilitiesUseCaseProps {
  page: number
}

export class GetManyAvailabilitiesUseCase {
  constructor(private availabilityRepository: AvailaibilityRepository) {}

  async execute({ page }: GetManyAvailabilitiesUseCaseProps) {
    const { availability, availabilityInMonth, totalCount } =
      await this.availabilityRepository.findManyAvailability(page)

    return { availability, availabilityInMonth, totalCount }
  }
}
