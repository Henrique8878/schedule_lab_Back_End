import { UsersRepository } from './repositories/users-repository'

interface GetManyUsersParams {
  page: number
}

export class GetManyUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page }: GetManyUsersParams) {
    const { users, totalCount } = await this.usersRepository.findManyUsers(page)
    return {
      users,
      totalCount,
    }
  }
}
