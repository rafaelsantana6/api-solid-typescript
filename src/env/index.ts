import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  API_URL: z.string().default('http://localhost'),
  API_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  ACCESS_TOKEN_EXP_TIME: z.string().default('5m'),
  REFRESH_TOKEN_EXP_TIME: z.string().default('30d'),
  STORAGE_TYPE: z.string().default('local'),
  AWS_S3_DEFAULT_REGION: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
  AWS_S3_ACCESS_KEY_ID: z.string(),
  AWS_S3_SECRET_ACCESS_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
