import { AvailaibilityRepository } from './repositories/availaibility-repository'

interface GetManyAvailabilitiesUseCaseProps {
  page: number
  name: string | undefined | null
  beginDate: string | undefined | null
  status: string | undefined | null
  visibility: string | undefined | null
}

export class GetManyAvailabilitiesUseCase {
  constructor(private availabilityRepository: AvailaibilityRepository) {}

  async execute({
    page,
    name,
    beginDate,
    status,
    visibility,
  }: GetManyAvailabilitiesUseCaseProps) {
    const { availability, availabilityInMonth, totalCount } =
      await this.availabilityRepository.findManyAvailability(
        page,
        name,
        beginDate,
        status,
        visibility,
      )

    return { availability, availabilityInMonth, totalCount }
  }
}
