import { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'

import { MeController } from '@/http/controllers/users/MeController'
import { ListUsersController } from '@/http/controllers/users/ListUsersController'
import { FindUserByIdController } from '@/http/controllers/users/FindUserByIdController'
import { FindUserByEmailController } from '@/http/controllers/users/FindUserByEmailController'
import { CreateUserController } from '../http/controllers/users/CreateUserController'
import { UpdateUserController } from '@/http/controllers/users/UpdateUserController'
import { DeleteUserController } from '@/http/controllers/users/DeleteUserController'

// ** Controllers
const meController = new MeController()
const createUserController = new CreateUserController()
const findUserByIdController = new FindUserByIdController()
const findUserByEmailController = new FindUserByEmailController()
const listUsersController = new ListUsersController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

// ** Routes
export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/', createUserController.handle)
  app.get('/me', { onRequest: [ensureAuthenticated] }, meController.handle)
  app.get('/', { onRequest: [ensureAuthenticated] }, listUsersController.handle)
  app.get(
    '/find-id/:id',
    { onRequest: [ensureAuthenticated] },
    findUserByIdController.handle
  )
  app.get(
    '/find-email/:email',
    { onRequest: [ensureAuthenticated] },
    findUserByEmailController.handle
  )
  app.put(
    '/:id',
    { onRequest: [ensureAuthenticated] },
    updateUserController.handle
  )
  app.delete(
    '/:id',
    { onRequest: [ensureAuthenticated] },
    deleteUserController.handle
  )
}
