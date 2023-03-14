import { FastifyInstance } from 'fastify'

import { AuthenticateUserController } from '@/http/controllers/users/AuthenticateUserController'
import { RefreshUserTokenController } from '@/http/controllers/refresh-tokens/RefreshUserTokenController'

// ** Controllers
const authenticateUserController = new AuthenticateUserController()
const refreshUserTokenController = new RefreshUserTokenController()

// ** Routes
export const authRoutes = async (app: FastifyInstance) => {
  app.post('/', authenticateUserController.handle)
  app.patch('/refresh', refreshUserTokenController.handle)
}
