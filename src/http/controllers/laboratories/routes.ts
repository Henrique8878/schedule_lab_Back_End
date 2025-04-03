import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteLab } from './delete'
import { GetManyLaboratories } from './get-many-laboratories'
import { UpdateLab } from './update'

export async function LaboratoriesRoutes(app: FastifyInstance) {
  app.post('/laboratory', create)
  app.get('/laboratory', GetManyLaboratories)
  app.delete('/laboratory/:labId', deleteLab)
  app.patch('/laboratory/:labId', UpdateLab)
}
