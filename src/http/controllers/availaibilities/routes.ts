import { FastifyInstance } from 'fastify'
import { create } from './create'
import { DeleteAvailability } from './delete'
import { getMany } from './get-many'
import { UpdateAvailability } from './update'

export async function AvailabilityRoutes(app: FastifyInstance) {
  app.post('/availability/:laboratoryId', create)
  app.get('/availability/get-many', getMany)
  app.delete('/availability/:id', DeleteAvailability)
  app.patch('/availability/:id', UpdateAvailability)
}
