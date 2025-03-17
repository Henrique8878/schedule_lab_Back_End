import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UsersRepository } from './repositories/users-repository'
import { compare } from 'bcryptjs'

interface authenticateUseCaseReturn {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: authenticateUseCaseReturn) {
    const hasUser = await this.usersRepository.findByEmail(email)

    if (!hasUser) {
      throw new InvalidCredentialsError()
    }

    const isTheSamePassword = await compare(password, hasUser.password_hash)

    if (!isTheSamePassword) {
      throw new InvalidCredentialsError()
    }

    return {
      hasUser,
    }
  }
}
