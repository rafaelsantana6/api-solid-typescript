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
  app.get('/me', { onRequest: [ensureAuthenticated] }, meController.handle)
  app.get('/', listUsersController.handle)
  app.get('/find-id/:id', findUserByIdController.handle)
  app.get('/find-email/:email', findUserByEmailController.handle)
  app.post('/', createUserController.handle)
  app.put('/:id', updateUserController.handle)
  app.delete('/:id', deleteUserController.handle)
}
