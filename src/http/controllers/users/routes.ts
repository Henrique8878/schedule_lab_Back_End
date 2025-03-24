import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { getProfile } from './get-profile'
import { UpdateUserProfile } from './update-user-profile'

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)
  app.get('/user-profile/:id', getProfile)
  app.patch('/user-profile/:id', UpdateUserProfile)
}
