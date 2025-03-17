import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function AvailabilityRoutes(app: FastifyInstance) {
  app.post('/availability/:laboratoryId', create)
}
