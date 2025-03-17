import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: data.id ? data.id : 'user-01',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      category: data.category,
      created_at: new Date(Date.now()),
    }

    this.users.push(user)
    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
