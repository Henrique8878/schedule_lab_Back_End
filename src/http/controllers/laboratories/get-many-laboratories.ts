import { MakeGetManyLaboratories } from '@/useCases/factories/make-get-laboratories'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function GetManyLaboratories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const QueryLaboratorySchema = z.object({
    page: z.string().default('1'),
  })

  const { page } = QueryLaboratorySchema.parse(request.query)
  const getManyLaboratories = MakeGetManyLaboratories()
  try {
    const laboratories = await getManyLaboratories.execute({
      page: Number(page),
    })
    reply.status(200).send({
      laboratories: laboratories?.laboratories,
      totalCount: laboratories?.totalCount,
    })
  } catch (e) {
    reply.status(400).send(e)
  }
}
