import { MakeGetManyAvailabilities } from '@/useCases/factories/make-get-many-availabilities'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getmanyAvailability = MakeGetManyAvailabilities()
    const manyAvailabilities = await getmanyAvailability.execute()
    reply.status(200).send(manyAvailabilities)
  } catch (e) {
    reply.status(400).send({
      message: e,
    })
  }
}
