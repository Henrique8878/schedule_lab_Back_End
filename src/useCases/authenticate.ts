import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UsersRepository } from './repositories/users-repository'

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

    const isValidate = await this.usersRepository.verifyValidation(
      hasUser.email,
    )

    if (!isValidate) {
      throw new Error('O link de validação expirou')
    }

    if (hasUser.isVerified === false) {
      throw new Error('Este e-mail não foi verificado para realizar o login')
    }
    await prisma.user.update({
      where: {
        email: hasUser.email,
      },
      data: {
        isVerified: true,
      },
    })

    const isTheSamePassword = await compare(password, hasUser.password_hash)

    if (!isTheSamePassword) {
      throw new InvalidCredentialsError()
    }

    return {
      hasUser,
    }
  }
}
