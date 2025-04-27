import { PrismaSignUpEventRepository } from '../repositories/prisma/prisma-sign-up-event-repository'
import { UpdateSignUpEventUseCase } from '../update-sign-up-event'

export function MakeUpdateSignUpEvent() {
  const prismaSignUpRepository = new PrismaSignUpEventRepository()
  const updateSignUpEventUseCase = new UpdateSignUpEventUseCase(
    prismaSignUpRepository,
  )
  return updateSignUpEventUseCase
}
