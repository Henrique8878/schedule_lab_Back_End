import { InvalidCredentialsError } from '@/useCases/errors/invalid-credentials-error'
import { MakeFirstAuthenticate } from '@/useCases/factories/make-first-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function FirstAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodyAuthenticateSchema = z.object({
    email: z.string().email(),
  })

  const { email } = bodyAuthenticateSchema.parse(request.body)

  try {
    const FirstAuthenticate = MakeFirstAuthenticate()
    const { hasUser } = await FirstAuthenticate.execute({
      email,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: hasUser.id,
        },
      },
    )

    reply.status(200).send({
      token,
    })
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      reply.status(401).send({
        message: e.message,
      })
    }

    if (e instanceof Error) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }
}
