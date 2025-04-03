import { UsersRepository } from './repositories/users-repository'

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return null
    }

    const deleteUser = await this.usersRepository.deleteUser(id)
    return deleteUser
  }
}
