import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { UpdateUserProfileUseCase } from '../update-user-profile'

export function MakeUpdateUserProfile() {
  const prismaUserRepository = new PrismaUsersRepository()
  const updateUserProfileUseCase = new UpdateUserProfileUseCase(
    prismaUserRepository,
  )
  return updateUserProfileUseCase
}
