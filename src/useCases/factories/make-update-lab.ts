import { PrismaLaboratoriesRepository } from '../repositories/prisma/prisma-laboratories-repository'
import { UpdateLabUseCase } from '../update-lab'

export function MakeUpdateLab() {
  const prismaLabRepository = new PrismaLaboratoriesRepository()
  const updateLab = new UpdateLabUseCase(prismaLabRepository)

  return updateLab
}
