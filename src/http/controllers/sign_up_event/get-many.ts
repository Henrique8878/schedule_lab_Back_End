import { MakeGetManySignUp } from '@/useCases/factories/make-get-many-sign-up'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetManySignUp(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getManySignUp = MakeGetManySignUp()
    const manySignUpEvent = await getManySignUp.execute()

    reply.status(200).send(manySignUpEvent)
  } catch (e) {
    if (e instanceof Error) {
      reply.status(400).send({
        message: e.message,
      })
    }
  }
}
