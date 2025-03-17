import { MakeGetManyLaboratories } from '@/useCases/factories/make-get-laboratories'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetManyLaboratories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getManyLaboratories = MakeGetManyLaboratories()
  try {
    const laboratories = await getManyLaboratories.execute()
    reply.status(200).send(laboratories)
  } catch (e) {
    reply.status(400).send(e)
  }
}
