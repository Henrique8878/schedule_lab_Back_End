import 'dotenv/config'
import * as z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']),
  PORT: z.number().default(3333),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new Error('invalid environment variable')
}

export const env = _env.data
