import { Laboratory } from '@prisma/client'
import { LaboratoryAlreadyExists } from './errors/laboratory-already-exists'
import { LaboratoriesRepository } from './repositories/laboratories-repository'

interface createLaboratoriesParams {
  userId: string
  name: string
  localization: string
  capacity: number
  description: string
  startOfBlockade: number
  endOfBlockade: number
  operatingDays: string
}

interface createLaboratoriesReturn {
  newLaboratory: Laboratory | null
}

export class CreateLaboratoryUseCase {
  constructor(private laboratoriesRepository: LaboratoriesRepository) {}

  async execute({
    userId,
    name,
    localization,
    description,
    capacity,
    startOfBlockade,
    endOfBlockade,
    operatingDays,
  }: createLaboratoriesParams): Promise<createLaboratoriesReturn> {
    const laboratory = await this.laboratoriesRepository.findByName(name)

    if (laboratory) {
      throw new LaboratoryAlreadyExists()
    }

    const newLaboratory = await this.laboratoriesRepository.create({
      userId,
      name,
      localization,
      description,
      capacity,
      startOfBlockade,
      endOfBlockade,
      operatingDays,
    })

    return {
      newLaboratory,
    }
  }
}
