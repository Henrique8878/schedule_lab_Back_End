import { UserUpdateNotExists } from './errors/user-update-not-exists'
import { UsersRepository } from './repositories/users-repository'

interface UpdateUserProfileUseCaseParams {
  id: string
  name: string
  category: string
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, name, category }: UpdateUserProfileUseCaseParams) {
    const user = this.usersRepository.updateUser(id, name, category)
    if (!user) {
      throw new UserUpdateNotExists()
    }

    return user
  }
}
