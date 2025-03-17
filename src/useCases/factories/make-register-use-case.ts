import { RegisterUseCase } from '../register-user'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

export function MakeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
