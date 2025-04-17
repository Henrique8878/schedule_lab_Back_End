import { EmailVerificationRepository } from './repositories/email-verification-repository'

interface EmailVerificationParams {
  email: string
  newUser: {
    id: string
    name: string
    email: string
    password_hash: string
    category: string
    created_at: string
  }
}

export class EmailVerificationUseCase {
  constructor(
    private emailVerificationRepository: EmailVerificationRepository,
  ) {}

  async execute({ email, newUser }: EmailVerificationParams) {
    this.emailVerificationRepository.create(email, newUser)
  }
}
