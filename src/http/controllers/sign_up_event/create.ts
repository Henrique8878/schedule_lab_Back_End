import { MakeCreateSignUp } from '@/useCases/factories/make-create-sign-up-event'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const signUpEventSchema = z.object({
    name: z.string(),
    email: z.string(),
    telephone: z.string(),
    availabilityId: z.string(),
  })

  const { name, email, telephone, availabilityId } = signUpEventSchema.parse(
    request.body,
  )

  try {
    const createSignUp = MakeCreateSignUp()
    const signUpEvent = await createSignUp.execute({
      name,
      email,
      telephone,
      availabilityId,
    })

    reply.status(200).send(signUpEvent)
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }
}
