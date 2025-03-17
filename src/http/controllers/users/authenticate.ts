import { InvalidCredentialsError } from '@/useCases/errors/invalid-credentials-error'
import { MakeAuthenticate } from '@/useCases/factories/make-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodyAuthenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = bodyAuthenticateSchema.parse(request.body)

  try {
    const authenticateService = MakeAuthenticate()
    const { hasUser } = await authenticateService.execute({
      email,
      password,
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

    throw e
  }
}
