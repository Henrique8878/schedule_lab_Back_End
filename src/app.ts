import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { AvailabilityRoutes } from './http/controllers/availaibilities/routes'
import { EmailVerificationRoutes } from './http/controllers/email_verification/routes'
import { LaboratoriesRoutes } from './http/controllers/laboratories/routes'
import { UsersRoutes } from './http/controllers/users/routes'
export const app = Fastify()

app.register(cors, {
  origin: 'http://localhost:5173', // Permite apenas a origem do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Cabeçalhos permitidos
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(UsersRoutes)
app.register(LaboratoriesRoutes)
app.register(AvailabilityRoutes)
app.register(EmailVerificationRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: error.message,
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send(error)
})
