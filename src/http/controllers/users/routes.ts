import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { getProfile } from './get-profile'
import { UpdateUserProfile } from './update-user-profile'
import { GetManyUsers } from './get-many'

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)
  app.patch('/user-profile/:id', UpdateUserProfile)
  app.get('/user-profile/:id', getProfile)
  app.get('/many-users', GetManyUsers)
}
