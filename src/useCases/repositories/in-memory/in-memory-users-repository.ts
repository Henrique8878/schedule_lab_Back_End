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

  async findById(id: string) {
    const user = await this.users.find((user) => {
      return user.id === id
    })

    if (!user) {
      return null
    }

    return user
  }

  async updateUser(id: string, name: string, email: string, category: string) {
    const index = this.users.findIndex((user) => {
      return user.id === id
    })

    const user = this.users.find((user) => {
      return user.id === id
    })

    if (user) {
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          name,
          email,
          category,
        }
        return user
      }
    }
    return null
  }

  async findManyUsers(page: number) {
    const users = []
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      users.push(this.users[i])
    }
    const totalCount = this.users.length
    return {
      users,
      totalCount,
    }
  }
}
