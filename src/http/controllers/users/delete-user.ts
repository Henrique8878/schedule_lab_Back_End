import { MakeDeleteUser } from '@/useCases/factories/delete-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function DeleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteUserSchema.parse(request.params)

  try {
    const deleteUser = MakeDeleteUser()
    const user = await deleteUser.execute(id)
    reply.status(200).send(user)
  } catch (e) {
    reply.status(400).send({
      erro: e,
    })
  }
}
