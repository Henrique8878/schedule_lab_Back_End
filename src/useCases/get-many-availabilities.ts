import { AvailaibilityRepository } from './repositories/availaibility-repository'

export class GetManyAvailabilitiesUseCase {
  constructor(private availabilityRepository: AvailaibilityRepository) {}

  async execute() {
    const manyAvailabilities =
      this.availabilityRepository.findManyAvailability()

    return manyAvailabilities
  }
}
