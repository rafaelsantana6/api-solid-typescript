import { FastifyInstance } from 'fastify'

import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'

import { MeController } from '@/http/controllers/users/MeController'
import { ListUsersController } from '@/http/controllers/users/ListUsersController'
import { FindUserByIdController } from '@/http/controllers/users/FindUserByIdController'
import { FindUserByEmailController } from '@/http/controllers/users/FindUserByEmailController'
import { CreateUserController } from '../http/controllers/users/CreateUserController'
import { UpdateUserController } from '@/http/controllers/users/UpdateUserController'
import { DeleteUserController } from '@/http/controllers/users/DeleteUserController'
import { adaptRoute } from '@/adapters/fastify-route-adapter'
import { makeCreateUserController } from '@/factories/controllers/users/makeCreateUserController'
import { makeFindUserByIdController } from '@/factories/controllers/users/makeFindUserByIdController'
import { makeFindUserByEmailController } from '@/factories/controllers/users/makeFindUserByEmailController'
import { makeUpdateUserController } from '@/factories/controllers/users/makeUpdateUserController'
import { auth } from '@/adapters/fastify-auth-adapter'
import { makeDeleteUserController } from '@/factories/controllers/users/makeDeleteUserController'
import { makeMeController } from '@/factories/controllers/users/makeMeController'

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
  app.post('/', adaptRoute(makeCreateUserController()))
  app.get(
    '/me',
    { onRequest: [ensureAuthenticated] },
    adaptRoute(makeMeController())
  )
  app.get('/', { onRequest: [ensureAuthenticated] }, listUsersController.handle)
  app.get(
    '/find-id/:id',
    { onRequest: [ensureAuthenticated] },
    adaptRoute(makeFindUserByIdController())
  )
  app.get(
    '/find-email/:email',
    { onRequest: [ensureAuthenticated] },
    adaptRoute(makeFindUserByEmailController())
  )
  app.put(
    '/:id',
    { onRequest: [ensureAuthenticated] },
    adaptRoute(makeUpdateUserController())
  )
  app.delete(
    '/:id',
    { onRequest: [ensureAuthenticated] },
    adaptRoute(makeDeleteUserController())
  )
}
