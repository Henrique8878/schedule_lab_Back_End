import { Prisma, Availability } from '@prisma/client'
import { AvailaibilityRepository } from '../availaibility-repository'

export class InMemoryAvailaibilityRepository
  implements AvailaibilityRepository
{
  private availaibilities: Availability[] = []
  async create({
    id,
    date,
    beginHour,
    endHour,
    laboratoryId,
  }: Prisma.AvailabilityUncheckedCreateInput) {
    const availaibility = {
      id: id || 'availaibility-01',
      date: new Date(date),
      beginHour: new Date(beginHour),
      endHour: new Date(endHour),
      laboratoryId,
      created_at: new Date(Date.now()),
    }

    this.availaibilities.push(availaibility)
    return availaibility
  }

  async findByDate(
    beginHour: Date,
    laboratoryId: string,
  ): Promise<Availability | null> {
    const availaibility = this.availaibilities.find((avail) => {
      // Compara apenas a parte da data sem milissegundos e sem segundos
      const beginDate = new Date(avail.beginHour).setSeconds(0, 0)
      const inputBeginDate = new Date(beginHour).setSeconds(0, 0)

      return avail.laboratoryId === laboratoryId && beginDate === inputBeginDate
    })

    if (!availaibility) {
      return null
    }

    return availaibility
  }
}
