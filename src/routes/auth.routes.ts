import { FastifyInstance } from 'fastify'

import { AuthenticateUserController } from '@/http/controllers/users/AuthenticateUserController'
import { RefreshUserTokenController } from '@/http/controllers/refresh-tokens/RefreshUserTokenController'
import { GetRefreshUserTokenController } from '@/http/controllers/refresh-tokens/GetRefreshUserTokenController'

// ** Controllers
const authenticateUserController = new AuthenticateUserController()
const getRefreshUserTokenController = new GetRefreshUserTokenController()
const refreshUserTokenController = new RefreshUserTokenController()

// ** Routes
export const authRoutes = async (app: FastifyInstance) => {
  app.post('/', authenticateUserController.handle)
  app.get('/refresh', getRefreshUserTokenController.handle)
  app.patch('/refresh', refreshUserTokenController.handle)
}
