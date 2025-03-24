import { MakeGetUserProfile } from '@/useCases/factories/make-get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'
import * as z from 'zod'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileSchema = z.object({
    id: z.string(),
  })

  const { id } = getUserProfileSchema.parse(request.params)
  try {
    const getProfilePrimsa = MakeGetUserProfile()
    const user = await getProfilePrimsa.execute({ id })
    reply.status(200).send(user)
  } catch (e) {
    reply.status(400).send()
  }
}
