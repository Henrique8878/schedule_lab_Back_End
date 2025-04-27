import { CreateSignUpEventUseCase } from '../create-sign-up-event'
import { PrismaSignUpEventRepository } from '../repositories/prisma/prisma-sign-up-event-repository'

export function MakeCreateSignUp() {
  const prismaSignUpRepository = new PrismaSignUpEventRepository()
  const createSignUpEventUseCase = new CreateSignUpEventUseCase(
    prismaSignUpRepository,
  )

  return createSignUpEventUseCase
}
