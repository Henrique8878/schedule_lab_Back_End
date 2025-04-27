import { GetManySignUpEventUseCase } from '../get-may-sign-up-event'
import { PrismaSignUpEventRepository } from '../repositories/prisma/prisma-sign-up-event-repository'

export function MakeGetManySignUp() {
  const prismaSignUpRepository = new PrismaSignUpEventRepository()
  const getManySignUpUseCase = new GetManySignUpEventUseCase(
    prismaSignUpRepository,
  )

  return getManySignUpUseCase
}
