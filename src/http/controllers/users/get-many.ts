import { MakeGetManyUsers } from '@/useCases/factories/make-get-many-users'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function GetManyUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findManyUsersSchema = z.object({
    page: z.number().default(1),
  })

  const { page } = findManyUsersSchema.parse(request.query)
  try {
    const getUsers = MakeGetManyUsers()
    const { users, totalCount } = await getUsers.execute({ page })
    reply.status(200).send({
      users,
      totalCount,
    })
  } catch (e) {
    reply.status(400).send({
      message: e,
    })
  }
}
