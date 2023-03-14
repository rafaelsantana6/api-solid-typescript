import { Controller } from '@/presentation/protocols'
import { CreateUserController } from '@/presentation/protocols/controllers/CreateUserController'
import { makeCreateUserUseCase } from '@/use-cases/@factories/users/makeCreateUserUseCase'

export const makeCreateUserController = (): Controller => {
  const controller = new CreateUserController(makeCreateUserUseCase())

  return controller
}
