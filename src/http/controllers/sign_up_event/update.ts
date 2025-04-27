import { MakeUpdateSignUpEvent } from '@/useCases/factories/make-update-sign-up-event'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const signUpEventSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    telephone: z.string().optional(),
  })

  const { id, name, email, telephone } = signUpEventSchema.parse(request.body)

  try {
    const updateSignUpEvent = MakeUpdateSignUpEvent()
    const signUpEvent = await updateSignUpEvent.execute({
      id,
      name,
      email,
      telephone,
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
