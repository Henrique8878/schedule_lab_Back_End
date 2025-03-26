import { GetManyUsersUseCase } from '../get-many-users'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

export function MakeGetManyUsers() {
  const usersPrismaRepository = new PrismaUsersRepository()
  const getManyUsers = new GetManyUsersUseCase(usersPrismaRepository)
  return getManyUsers
}
