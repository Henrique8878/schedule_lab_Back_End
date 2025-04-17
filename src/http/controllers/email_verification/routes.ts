import { FastifyInstance } from 'fastify'
import { create } from './create'

export function EmailVerificationRoutes(app: FastifyInstance) {
  app.post('/verify-email/:email', create)
}
