import { DeleteUserUseCase } from '../delete-user'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

export function MakeDeleteUser() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)
  return deleteUserUseCase
}
