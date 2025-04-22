import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserUncheckedCreateInput): Promise<User | null>
  verifyValidation(email: string): Promise<boolean>
  updateUser(id: string, name: string, category: string): Promise<User | null>
  findManyUsers(
    page: number,
  ): Promise<{ users: User[] | []; totalCount: number }>

  deleteUser(id: string): Promise<User | null>
}
