import { prisma } from '@/lib/prisma'
import { Prisma, SignUpEvent } from '@prisma/client'
import { SignUpEventRepository } from '../sign-up-event-repository'

export class PrismaSignUpEventRepository implements SignUpEventRepository {
  async create(
    data: Prisma.SignUpEventUncheckedCreateInput,
  ): Promise<SignUpEvent> {
    const findEmail = await prisma.signUpEvent.findFirst({
      where: {
        email: data.email,
      },
    })

    if (findEmail) {
      throw new Error('Email já cadastrado')
    }

    const findPhone = await prisma.signUpEvent.findFirst({
      where: {
        telephone: data.telephone,
      },
    })

    if (findPhone) {
      throw new Error('Telefone já cadastrado')
    }

    const signUpEvent = await prisma.signUpEvent.create({
      data,
    })

    return signUpEvent
  }

  async getSignUpById(id: string): Promise<SignUpEvent | null> {
    const signUp = await prisma.signUpEvent.findUnique({
      where: {
        id,
      },
    })

    return signUp
  }

  async getManySignUp(): Promise<SignUpEvent[] | []> {
    const manySignUp = await prisma.signUpEvent.findMany()
    return manySignUp
  }

  async updateSignUp(
    id: string,
    data: Prisma.SignUpEventUncheckedUpdateInput,
  ): Promise<SignUpEvent> {
    const updateSignUp = await prisma.signUpEvent.update({
      data,
      where: {
        id,
      },
    })

    return updateSignUp
  }

  async deleteSignUp(id: string): Promise<SignUpEvent> {
    const deleteSignUp = await prisma.signUpEvent.delete({
      where: {
        id,
      },
    })

    return deleteSignUp
  }
}
