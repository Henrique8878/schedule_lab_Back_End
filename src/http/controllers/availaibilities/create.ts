import { AvailabilityAlreadyExists } from '@/useCases/errors/availaibility-already-exists'
import { MakeCreateAvailaibility } from '@/useCases/factories/make-create-availaibility'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAvailaibilitySchema = z.object({
    date: z.string().date(),
    beginHour: z.string().datetime(),
    endHour: z.string().datetime(),
  })

  const laboratoryIdSchema = z.object({
    laboratoryId: z.string(),
  })

  const { date, beginHour, endHour } = createAvailaibilitySchema.parse(
    request.body,
  )
  const { laboratoryId } = laboratoryIdSchema.parse(request.params)

  try {
    const createAvailaibilitiesUseCase = MakeCreateAvailaibility()
    const { newAvailaibility } = await createAvailaibilitiesUseCase.execute({
      date: new Date(date),
      beginHour: new Date(beginHour),
      endHour: new Date(endHour),
      laboratoryId,
    })
    reply.status(201).send(newAvailaibility)
  } catch (e) {
    if (e instanceof AvailabilityAlreadyExists) {
      reply.status(409).send({
        message: e.message,
      })
    }
    reply.status(409).send({
      message: e,
    })
  }
}
