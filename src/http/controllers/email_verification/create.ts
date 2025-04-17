import { MakeEmailVerification } from '@/useCases/factories/make-email-verification'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'
export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createEmailVerificationSchema = z.object({
    email: z.string(),
  })

  const newUserBodySchema = z.object({
    newUser: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      password_hash: z.string(),
      category: z.string(),
      created_at: z.string(),
    }),
  })

  const { email } = createEmailVerificationSchema.parse(request.params)
  const { newUser } = newUserBodySchema.parse(request.body)

  try {
    const emailVerification = MakeEmailVerification()
    await emailVerification.execute({ email, newUser })
    reply.status(200).send('Um link de verificação foi enviado para seu e-mail')
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }
}
