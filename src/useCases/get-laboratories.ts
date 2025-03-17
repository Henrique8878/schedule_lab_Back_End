import { LaboratoriesRepository } from './repositories/laboratories-repository'

export class GetLaboretoriesUseCase {
  constructor(private laboratoriesRepository: LaboratoriesRepository) {}

  async execute() {
    const laboratories =
      await this.laboratoriesRepository.findManyLaboratories()

    return laboratories
  }
}
