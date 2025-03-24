import { GetUserProfileUseCase } from '../get-user-profile'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

export function MakeGetUserProfile() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserProfile = new GetUserProfileUseCase(prismaUsersRepository)

  return getUserProfile
}
