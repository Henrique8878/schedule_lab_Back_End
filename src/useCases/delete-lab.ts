import { LabNotFoundError } from './errors/lab-not-found'
import { LaboratoriesRepository } from './repositories/laboratories-repository'

interface DeleteLabUseCaseParams {
  labId: string
}

export class DeleteLabUseCase {
  constructor(private labRepository: LaboratoriesRepository) {}

  async execute({ labId }: DeleteLabUseCaseParams) {
    const lab = await this.labRepository.findLabById(labId)

    if (!lab) {
      throw new LabNotFoundError()
    }

    const laboratory = await this.labRepository.deleteLab(labId)
    return laboratory
  }
}
