import { GetSignUpEventUseCase } from '../get-sign-up-event'
import { PrismaSignUpEventRepository } from '../repositories/prisma/prisma-sign-up-event-repository'

export function MakeGetSignUpById() {
  const prismaSignUpRepository = new PrismaSignUpEventRepository()
  const getSignUpByIdUseCase = new GetSignUpEventUseCase(prismaSignUpRepository)
  return getSignUpByIdUseCase
}
