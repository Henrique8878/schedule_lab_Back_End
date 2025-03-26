import { UsersRepository } from './repositories/users-repository'

export class GetManyUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findManyUsers()
    return users
  }
}
