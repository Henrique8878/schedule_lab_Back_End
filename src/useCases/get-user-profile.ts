import { UsersRepository } from './repositories/users-repository'

interface GetUserProfileUseCaseParams {
  id: string
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUserProfileUseCaseParams) {
    const user = this.usersRepository.findById(id)
    if (!user) {
      return null
    }

    return user
  }
}
