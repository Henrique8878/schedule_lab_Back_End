import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  updateUser(
    id: string,
    name: string,
    email: string,
    category: string,
  ): Promise<User | null>
}
