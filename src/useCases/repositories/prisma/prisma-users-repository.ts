import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async verifyValidation(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
        isVerified: false,
        expires_at: {
          lt: new Date(),
        },
      },
    })

    if (user) {
      return false
    }

    return true
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        manyLaboratory: true,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        manyLaboratory: true,
        manyAvailability: true,
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async updateUser(id: string, name: string, category: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        category,
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async findManyUsers(page: number) {
    await prisma.user.deleteMany({
      where: {
        expires_at: {
          lt: new Date(),
        },
        isVerified: false,
      },
    })
    const users = await prisma.user.findMany({
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'asc',
      },
      include: {
        manyLaboratory: true,
      },
    })

    const totalCount = await prisma.user.count({
      where: {
        created_at: {
          gte: dayjs().startOf('month').toDate(),
          lte: dayjs().endOf('month').toDate(),
        },
        isVerified: true,
      },
    })

    return {
      users,
      totalCount,
    }
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    await prisma.user.delete({
      where: {
        id,
      },
    })

    return user
  }
}
