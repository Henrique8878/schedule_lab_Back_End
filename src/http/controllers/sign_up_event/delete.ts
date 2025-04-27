import { MakeDeleteSignUpEvent } from '@/useCases/factories/make-delete-sign-up-event'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function deleteSignUp(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const signUpEventSchema = z.object({
    id: z.string(),
  })

  const { id } = signUpEventSchema.parse(request.body)

  try {
    const deleteSignUpById = MakeDeleteSignUpEvent()
    const signUpEvent = await deleteSignUpById.execute({ id })

    reply.status(200).send(signUpEvent)
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }
}
