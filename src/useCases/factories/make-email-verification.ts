import { EmailVerificationUseCase } from '../email-verification'
import { PrismaEmailVerificationRepository } from '../repositories/prisma/prisma-email-verification-repository'

export function MakeEmailVerification() {
  const prismaEmailVerificationRepository =
    new PrismaEmailVerificationRepository()
  const emailVerificationUseCase = new EmailVerificationUseCase(
    prismaEmailVerificationRepository,
  )
  return emailVerificationUseCase
}
