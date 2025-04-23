import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'
import { randomUUID } from 'node:crypto'
import {
  EmailVerificationRepository,
  typeUser,
} from '../email-verification-repository'

export class PrismaEmailVerificationRepository
  implements EmailVerificationRepository
{
  async create(email: string, newUser: typeUser) {
    try {
      await prisma.emailVerification.deleteMany({
        where: {
          userEmail: email,
        },
      })
      const emailVerification = await prisma.emailVerification.create({
        data: {
          userEmail: email,
          expires_at: dayjs().add(15, 'minutes').toDate(),
          token: randomUUID(),
        },
      })

      const mailSend = new MailerSend({ apiKey: env.MAIL_SEND_API_KEY })

      const sendFrom = new Sender(
        'no-reply@test-xkjn41mm2vq4z781.mlsender.net',
        'Equipe Teste',
      )

      const recipients = [new Recipient(email, 'Novo Usuário')]

      const emailParams = new EmailParams()
        .setFrom(sendFrom)
        .setTo(recipients)
        .setSubject('Verificação de E-mail')
        .setHtml(
          `
          <!DOCTYPE html>
          <html lang="pt-BR">
            <head>
              <meta charset="UTF-8" />
              <title>Verificação de E-mail</title>
            </head>
            <body style="font-family: sans-serif; line-height: 1.4;">
              <p>Olá!</p>
              <p>Clique no link abaixo para validar seu e-mail:</p>
              <p>
                <a href="${env.APP_URL}/verify-email?token=${emailVerification.token}&email=${newUser.email}" target="_blank">
                  Validar E-mail
                </a>
              </p>
              <p>Se você não solicitou isso, pode ignorar este e-mail.</p>
              <hr />
              <p style="font-size: 12px; color: #888;">Enviado por Equipe Teste - ${env.APP_URL}</p>
            </body>
          </html>
        `,
        )
        .setText('Clique no link para validar seu E-mail')

      await mailSend.email.send(emailParams)
    } catch (e) {
      console.log(e)
    }
  }
}
