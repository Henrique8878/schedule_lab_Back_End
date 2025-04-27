import { DeleteSignUpEventUseCase } from '../delete-sign-up-event'
import { PrismaSignUpEventRepository } from '../repositories/prisma/prisma-sign-up-event-repository'

export function MakeDeleteSignUpEvent() {
  const prismaSignUpRepository = new PrismaSignUpEventRepository()
  const deleteSignUpEventUseCase = new DeleteSignUpEventUseCase(
    prismaSignUpRepository,
  )
  return deleteSignUpEventUseCase
}
