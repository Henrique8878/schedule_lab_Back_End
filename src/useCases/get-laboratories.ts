import { LaboratoriesRepository } from './repositories/laboratories-repository'

interface GetLaboratoriesParams {
  page: number
}

export class GetLaboretoriesUseCase {
  constructor(private laboratoriesRepository: LaboratoriesRepository) {}

  async execute({ page }: GetLaboratoriesParams) {
    const laboratories =
      await this.laboratoriesRepository.findManyLaboratories(page)

    return laboratories
  }
}
