import { Laboratory, Prisma } from '@prisma/client'
import { LaboratoriesRepository } from '../laboratories-repository'

export class InMemoryLaboratoriesRepository implements LaboratoriesRepository {
  private laboratories: Laboratory[] = []

  async create({
    id,
    name,
    description,
    capacity,
    localization,
    userId,
  }: Prisma.LaboratoryUncheckedCreateInput) {
    const laboratory = {
      id: id || 'laboratory-01',
      name,
      description,
      capacity,
      localization,
      userId,
      quantityReservations: 0,
    }

    this.laboratories.push(laboratory)
    return laboratory
  }

  async findByName(name: string) {
    const laboratory = await this.laboratories.find(
      (lab) => lab.name.toLowerCase() === name.toLowerCase(),
    )

    if (!laboratory) {
      return null
    }

    return laboratory
  }

  async findManyLaboratories() {
    const laboratories = this.laboratories
    if (!laboratories) {
      return null
    }
    return laboratories
  }
}
