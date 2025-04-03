import * as z from 'zod'

import { MakeUpdateLab } from '@/useCases/factories/make-update-lab'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function UpdateLab(request: FastifyRequest, reply: FastifyReply) {
  const updateLabBody = z.object({
    name: z.string(),
    capacity: z.coerce.number(),
    localization: z.string(),
    description: z.string(),
  })

  const updateLabParams = z.object({
    labId: z.string().uuid(),
  })

  const { labId } = updateLabParams.parse(request.params)
  const { name, localization, capacity, description } = updateLabBody.parse(
    request.body,
  )

  try {
    const updateLab = MakeUpdateLab()
    const laboratory = await updateLab.execute({
      labId,
      name,
      localization,
      capacity,
      description,
    })
    reply.status(200).send(laboratory)
  } catch (e) {
    reply.status(500).send()
  }
}
