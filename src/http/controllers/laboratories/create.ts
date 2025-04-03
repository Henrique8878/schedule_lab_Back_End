import { LaboratoryAlreadyExists } from '@/useCases/errors/laboratory-already-exists'
import { MakeCreateLaboratoryUseCase } from '@/useCases/factories/make-create-laboratory-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createLaboratorySchema = z.object({
    userId: z.string(),
    name: z.string().min(6),
    localization: z.string().min(2),
    capacity: z.number(),
    description: z.string(),
  })

  const { userId, name, localization, capacity, description } =
    createLaboratorySchema.parse(request.body)

  try {
    const createLaboratoryUseCase = MakeCreateLaboratoryUseCase()
    const { newLaboratory } = await createLaboratoryUseCase.execute({
      userId,
      name,
      localization,
      capacity,
      description,
    })
    reply.status(201).send(newLaboratory)
  } catch (e) {
    if (e instanceof LaboratoryAlreadyExists) {
      reply.status(409).send({
        message: e.message,
      })
    }
  }
}
