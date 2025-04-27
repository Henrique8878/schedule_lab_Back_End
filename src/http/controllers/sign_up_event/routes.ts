import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteSignUp } from './delete'
import { GetManySignUp } from './get-many'
import { GetSignUp } from './get-sign-up'
import { update } from './update'

export function SignUpEventRoutes(app: FastifyInstance) {
  app.post('/sign-up-event', create)
  app.get('/sign-up-event', GetSignUp)
  app.get('/many-sign-up-event', GetManySignUp)
  app.patch('/sign-up-event', update)
  app.delete('/sign-up-event', deleteSignUp)
}
