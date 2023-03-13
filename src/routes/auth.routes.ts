import { Router } from 'express'

import { AuthenticateUserController } from '@/http/controllers/users/AuthenticateUserController'
import { RefreshUserTokenController } from '@/http/controllers/refresh-tokens/RefreshUserTokenController'

// ** Controllers
const authenticateUserController = new AuthenticateUserController()
const refreshUserTokenController = new RefreshUserTokenController()

// ** Routes
const authRoutes = Router()

authRoutes.post('/', authenticateUserController.handle)

authRoutes.post('/refresh', refreshUserTokenController.handle)

export { authRoutes }
