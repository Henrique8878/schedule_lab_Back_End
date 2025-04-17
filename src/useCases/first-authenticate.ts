import { prisma } from '@/lib/prisma'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UsersRepository } from './repositories/users-repository'

interface authenticateUseCaseReturn {
  email: string
}

export class FirstAuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: authenticateUseCaseReturn) {
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

    await prisma.user.update({
      where: {
        email: hasUser.email,
      },
      data: {
        isVerified: true,
      },
    })

    return {
      hasUser,
    }
  }
}
