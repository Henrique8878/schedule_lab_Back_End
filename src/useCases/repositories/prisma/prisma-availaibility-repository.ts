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

    const availabilityBetweenHours = await prisma.availability.findFirst({
      where: {
        beginHour: {
          gt: data.beginHour,
        },
        endHour: {
          lt: data.endHour,
        },
        status: 'approved',
        laboratoryId: data.laboratoryId,
      },
    })

    if (availabilityBetweenHours) {
      throw new Error(
        'Na data escolhida, já existem horários agendados entre os que você selecionou.',
      )
    }

    const availabilityEqualHours = await prisma.availability.findFirst({
      where: {
        beginHour: {
          equals: data.beginHour,
        },
        endHour: {
          equals: data.endHour,
        },
        status: 'approved',
        laboratoryId: data.laboratoryId,
      },
    })

    if (availabilityEqualHours) {
      throw new Error('Já existe um horário agendado nessa data')
    }

    if (Number(data.endHour) < Number(data.beginHour)) {
      throw new Error(
        'O horário final não pode ser menor que o horário inicial',
      )
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
    await prisma.user.deleteMany({
      where: {
        expires_at: {
          lt: new Date(),
        },
        isVerified: false,
      },
    })

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
