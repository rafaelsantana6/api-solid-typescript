import { FastifyInstance } from 'fastify'

import { authRoutes } from './auth.routes'
import { usersRoutes } from './users.routes'

export const router = async (app: FastifyInstance) => {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(authRoutes, { prefix: '/auth' })
}
