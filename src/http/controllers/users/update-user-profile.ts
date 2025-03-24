import { UserUpdateNotExists } from '@/useCases/errors/user-update-not-exists'
import { MakeUpdateUserProfile } from '@/useCases/factories/make-update-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function UpdateUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    category: z.enum(['admin', 'user']),
  })

  const updateUserSchemaParams = z.object({
    id: z.string(),
  })

  const { name, email, category } = updateUserSchema.parse(request.body)
  const { id } = updateUserSchemaParams.parse(request.params)
  try {
    const updateUser = MakeUpdateUserProfile()
    const user = await updateUser.execute({ id, name, email, category })
    reply.status(200).send(user)
  } catch (e) {
    if (e instanceof UserUpdateNotExists) {
      reply.status(400).send({
        message: e.message,
      })
    }

    reply.status(400).send(e)
  }
}
