import { FirstAuthenticateUseCase } from '../first-authenticate'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

export function MakeFirstAuthenticate() {
  const prismaUserRepository = new PrismaUsersRepository()
  const firstAuthenticateUseCase = new FirstAuthenticateUseCase(
    prismaUserRepository,
  )
  return firstAuthenticateUseCase
}
