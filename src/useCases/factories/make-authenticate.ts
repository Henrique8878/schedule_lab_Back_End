import { AuthenticateUseCase } from '../authenticate'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

export function MakeAuthenticate() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
  return authenticateUseCase
}
