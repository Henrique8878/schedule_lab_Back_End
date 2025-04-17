import { AvailabilityMax10 } from '@/useCases/errors/availability-max-10'
import { AvailabilityAlreadyExists } from '@/useCases/errors/availaibility-already-exists'
import { MakeCreateAvailaibility } from '@/useCases/factories/make-create-availaibility'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAvailaibilitySchema = z.object({
    date: z.string().date(),
    beginHour: z.string().datetime(),
    endHour: z.string().datetime(),
    userId: z.string(),
  })

  const laboratoryIdSchema = z.object({
    laboratoryId: z.string(),
  })

  const { date, beginHour, endHour, userId } = createAvailaibilitySchema.parse(
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
      userId,
    })
    reply.status(201).send(newAvailaibility)
  } catch (e) {
    if (e instanceof AvailabilityAlreadyExists) {
      reply.status(409).send({
        message: e.message,
      })
    }
    if (e instanceof AvailabilityMax10) {
      reply.status(409).send({
        message: e.message,
      })
    }

    if (e instanceof Error) {
      reply.status(409).send({
        message: e.message,
      })
    }
  }
}
