import { DeleteLabUseCase } from '../delete-lab'
import { PrismaLaboratoriesRepository } from '../repositories/prisma/prisma-laboratories-repository'

export function MakeDeleteLab() {
  const labRepository = new PrismaLaboratoriesRepository()
  const deleteLabUseCase = new DeleteLabUseCase(labRepository)
  return deleteLabUseCase
}
