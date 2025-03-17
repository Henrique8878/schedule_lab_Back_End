import { FastifyInstance } from 'fastify'
import { create } from './create'
import { GetManyLaboratories } from './get-many-laboratories'

export async function LaboratoriesRoutes(app: FastifyInstance) {
  app.post('/laboratory', create)
  app.get('/laboratory', GetManyLaboratories)
}
