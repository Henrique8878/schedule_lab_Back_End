import { MakeGetManyUsers } from '@/useCases/factories/make-get-many-users'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetManyUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getUsers = MakeGetManyUsers()
    const users = await getUsers.execute()
    reply.status(200).send(users)
  } catch (e) {
    reply.status(400).send({
      message: e,
    })
  }
}
