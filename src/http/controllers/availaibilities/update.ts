import { MakeUpdateAvailability } from '@/useCases/factories/make-update-availability'
import { FastifyReply, FastifyRequest } from 'fastify'

import * as z from 'zod'

export async function UpdateAvailability(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateAvailabilityParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateAvailabilityBodySchema = z.object({
    status: z.enum(['pending', 'approved', 'rejected']),
  })

  const { id } = updateAvailabilityParamsSchema.parse(request.params)
  const { status } = updateAvailabilityBodySchema.parse(request.body)

  try {
    const updateAvailability = MakeUpdateAvailability()
    const availability = await updateAvailability.execute({ id, status })
    reply.status(200).send({
      availability,
    })
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Availability not found') {
        return reply.status(404).send({
          message: e.message,
        })
      }
      return reply.status(500).send({
        message: 'Internal server error',
      })
    }
    return reply.status(500).send({
      message: 'Internal server error',
    })
  }
}
