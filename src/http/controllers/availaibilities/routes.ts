import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getMany } from './get-many'

export async function AvailabilityRoutes(app: FastifyInstance) {
  app.post('/availability/:laboratoryId', create)
  app.get('/availability/get-many', getMany)
}
