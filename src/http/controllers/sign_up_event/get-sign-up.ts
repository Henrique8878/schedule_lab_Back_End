import { MakeGetSignUpById } from '@/useCases/factories/make-get-sign-up-event-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function GetSignUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpEventSchema = z.object({
    id: z.string(),
  })

  const { id } = signUpEventSchema.parse(request.body)

  try {
    const getSignUpById = MakeGetSignUpById()
    const signUpEvent = await getSignUpById.execute({ id })

    reply.status(200).send(signUpEvent)
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }
}
