import { LabNotFoundError } from '@/useCases/errors/lab-not-found'
import { MakeDeleteLab } from '@/useCases/factories/delete-lab'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function deleteLab(request: FastifyRequest, reply: FastifyReply) {
  const deleteLabParams = z.object({
    labId: z.string().uuid(),
  })

  const { labId } = deleteLabParams.parse(request.params)

  try {
    const deleteLab = MakeDeleteLab()
    const laboratory = await deleteLab.execute({ labId })
    reply.status(200).send(laboratory)
  } catch (e) {
    if (e instanceof LabNotFoundError) {
      reply.status(400).send({
        error: e.message,
      })
    }

    reply.status(500).send()
  }
}
