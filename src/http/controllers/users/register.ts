import { UserAlreadyExists } from '@/useCases/errors/user-already-exists'
import { MakeRegisterUseCase } from '@/useCases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodyRegisterSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password_hash: z.string().min(8),
    category: z.enum(['admin', 'user']),
  })

  const { name, email, password_hash, category } = bodyRegisterSchema.parse(
    request.body,
  )

  try {
    const registerUseCase = MakeRegisterUseCase()
    const newUser = await registerUseCase.execute({
      name,
      email,
      password_hash,
      category,
    })
    reply.status(201).send(newUser)
  } catch (e) {
    if (e instanceof UserAlreadyExists) {
      reply.status(409).send({
        message: e.message,
      })
    }

    throw e
  }
}
