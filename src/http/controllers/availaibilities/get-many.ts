import { MakeGetManyAvailabilities } from '@/useCases/factories/make-get-many-availabilities'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  const getManyAvailability = z.object({
    page: z.coerce.number().default(1),
  })

  const getManyAvailabilityQuery = z.object({
    name: z.string().optional(),
    beginDate: z.string().optional(),
    status: z.string().optional(),
    visibility: z.string().optional(),
  })

  const { page } = getManyAvailability.parse(request.query)
  const { name, beginDate, status, visibility } =
    getManyAvailabilityQuery.parse(request.query)

  try {
    const getmanyAvailability = MakeGetManyAvailabilities()
    const manyAvailabilities = await getmanyAvailability.execute({
      page,
      name,
      beginDate,
      status,
      visibility,
    })
    reply.status(200).send(manyAvailabilities)
  } catch (e) {
    reply.status(400).send({
      message: e,
    })
  }
}
