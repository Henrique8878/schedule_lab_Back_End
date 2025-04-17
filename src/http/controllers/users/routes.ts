import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { DeleteUser } from './delete-user'
import { FirstAuthenticate } from './first-authenticate'
import { GetManyUsers } from './get-many'
import { getProfile } from './get-profile'
import { register } from './register'
import { UpdateUserProfile } from './update-user-profile'

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)
  app.post('/first-authenticate', FirstAuthenticate)
  app.patch('/user-profile/:id', UpdateUserProfile)
  app.get('/user-profile/:id', getProfile)
  app.get('/many-users', GetManyUsers)
  app.delete('/user/:id', DeleteUser)
}
