import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'

import { logger } from './lib/logger'
import { router } from './routes/index'
import { errorMiddleware } from './http/middlewares/error'

// ** Fastify
export const app = fastify({ logger: logger[env.NODE_ENV] })

app.register(fastifyCookie)

app.register(router)

// ! IMPORTANT: need to be the last middleware on app
app.setErrorHandler(errorMiddleware)
