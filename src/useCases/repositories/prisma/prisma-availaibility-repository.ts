import { prisma } from '@/lib/prisma'
import { AvailabilityMax10 } from '@/useCases/errors/availability-max-10'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { AvailaibilityRepository } from '../availaibility-repository'

export class PrismaAvailaibilityRepository implements AvailaibilityRepository {
  async create(data: Prisma.AvailabilityUncheckedCreateInput) {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    })

    if (user?.category === 'user') {
      const availability = await prisma.availability.count()
      if (availability >= 10) {
        throw new AvailabilityMax10()
      }
    }
    const sameBeginHour = await prisma.availability.findFirst({
      where: {
        beginHour: {
          equals: data.beginHour,
        },
        laboratoryId: data.laboratoryId,
      },
    })

    const sameEndHour = await prisma.availability.findFirst({
      where: {
        endHour: {
          equals: data.endHour,
        },
        laboratoryId: data.laboratoryId,
      },
    })

    const sameBeginEndHour = await prisma.availability.findFirst({
      where: {
        beginHour: {
          equals: data.beginHour,
        },
        endHour: data.endHour,
        laboratoryId: data.laboratoryId,
      },
    })

    if (sameBeginEndHour) {
      throw new Error('Não é possível agendar horários iguais de início e fim')
    }

    if (sameBeginHour || sameEndHour) {
      return null
    }

    const availaibility = await prisma.availability.create({
      data,
      include: {
        laboratory: true,
      },
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

  async findManyAvailability(page: number) {
    const manyAvailabilities = await prisma.availability.findMany({
      take: 10,
      skip: (page - 1) * 10,
      include: {
        laboratory: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    const totalCount = await prisma.availability.count()

    const availabilityInMonth = await prisma.availability.count({
      where: {
        created_at: {
          gte: dayjs().startOf('month').toDate(),
          lte: dayjs().endOf('month').toDate(),
        },
      },
    })
    return {
      availability: manyAvailabilities,
      availabilityInMonth,
      totalCount,
    }
  }

  async deleteAvailability(id: string) {
    const availability = await prisma.availability.delete({
      where: {
        id,
      },
    })

    return availability
  }

  async updateAvailability(id: string, status: string) {
    const availability = await prisma.availability.update({
      where: {
        id,
      },
      data: {
        status,
      },
      include: {
        laboratory: true,
      },
    })

    return availability
  }
}
