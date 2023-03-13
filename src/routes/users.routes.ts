import { Router } from 'express'

import { ensureAuthenticated } from '../http/middlewares/ensureAuthenticated'

import { CreateUserController } from '../http/controllers/users/CreateUserController'
import { MeController } from '@/http/controllers/users/MeController'
import { FindUserByIdController } from '@/http/controllers/users/FindUserByIdController'
import { FindUserByEmailController } from '@/http/controllers/users/FindUserByEmailController'
import { ListUsersController } from '@/http/controllers/users/ListUsersController'
import { UpdateUserController } from '@/http/controllers/users/UpdateUserController'
import { DeleteUserController } from '@/http/controllers/users/DeleteUserController'

const usersRoutes = Router()

const meController = new MeController()
const createUserController = new CreateUserController()
const findUserByIdController = new FindUserByIdController()
const findUserByEmailController = new FindUserByEmailController()
const listUsersController = new ListUsersController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

// TODO: fix these errors
usersRoutes.use(ensureAuthenticated)

usersRoutes.get('/me', meController.handle)

usersRoutes.post('/', createUserController.handle)

usersRoutes.get('/find-id/:id', findUserByIdController.handle)

usersRoutes.get('/find-email/:email', findUserByEmailController.handle)

usersRoutes.get('/list', listUsersController.handle)

usersRoutes.put('/:id', updateUserController.handle)

usersRoutes.delete('/:id', deleteUserController.handle)

export { usersRoutes }
