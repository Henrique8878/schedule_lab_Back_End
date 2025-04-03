import { LabNotFoundError } from './errors/lab-not-found'
import { LaboratoriesRepository } from './repositories/laboratories-repository'

interface UpdateLabParams {
  labId: string
  name: string
  capacity: number
  localization: string
  description: string
}

export class UpdateLabUseCase {
  constructor(private labRepository: LaboratoriesRepository) {}

  async execute({
    labId,
    name,
    localization,
    capacity,
    description,
  }: UpdateLabParams) {
    const lab = this.labRepository.findLabById(labId)

    if (!lab) {
      throw new LabNotFoundError()
    }

    const laboratory = this.labRepository.updateLab(labId, {
      name,
      capacity,
      localization,
      description,
    })

    return laboratory
  }
}
