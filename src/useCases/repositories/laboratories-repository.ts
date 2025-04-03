import { Laboratory, Prisma } from '@prisma/client';

export interface LaboratoriesRepository {
  create(
    data: Prisma.LaboratoryUncheckedCreateInput,
  ): Promise<Laboratory | null>
  findByName(name: string): Promise<Laboratory | null>
  findManyLaboratories(
    page: number,
  ): Promise<{ laboratories: Laboratory[]; totalCount: number } | null>
  findLabById(id: string): Promise<Laboratory | null>
  deleteLab(labId: string): Promise<Laboratory | null>
  updateLab(
    id: string,
    data: Prisma.LaboratoryUncheckedUpdateInput,
  ): Promise<Laboratory | null>
}
