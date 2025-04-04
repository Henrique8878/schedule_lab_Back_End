import { MakeDeleteAvailability } from '@/useCases/factories/make-delete-availability'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function DeleteAvailability(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteAvailabilityParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteAvailabilityParams.parse(request.params)

  try {
    const deleteAvailability = MakeDeleteAvailability()
    const availability = await deleteAvailability.execute({ id })
    reply.status(200).send(availability)
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send({
        error: e.message,
      })
    }

    reply.status(500).send()
  }
}
