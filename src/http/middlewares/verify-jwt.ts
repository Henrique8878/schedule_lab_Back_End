import { FastifyReply, FastifyRequest } from 'fastify'

export async function Verifyjwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (e) {
    reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
