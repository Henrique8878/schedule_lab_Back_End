import { Prisma } from '@prisma/client'
import { AvailaibilityRepository } from '../availaibility-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaAvailaibilityRepository implements AvailaibilityRepository {
  async create(data: Prisma.AvailabilityUncheckedCreateInput) {
    const availaibility = await prisma.availability.create({
      data,
    })

    return availaibility
  }

  async findByDate(beginHour: Date, laboratoryId: string) {
    const dayJsBeginHour = dayjs(beginHour)
    const hourBeginHour = dayJsBeginHour.hour()

    const availability = await prisma.availability.findFirst({
      where: {
        beginHour: {
          gte: dayjs()
            .hour(hourBeginHour)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate(),
          lt: dayjs()
            .hour(hourBeginHour + 1)
            .minute(0)
            .second(0)
            .millisecond(0)
            .toDate(),
        },
        laboratoryId,
      },
    })

    return availability
  }

  async findManyAvailability() {
    const manyAvailabilities = await prisma.availability.findMany({
      include: {
        laboratory: true,
      },
    })
    return manyAvailabilities
  }
}
