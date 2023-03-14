import { Controller } from '@/presentation/protocols'
import { DeleteUserController } from '@/presentation/protocols/controllers/DeleteUserController'
import { makeDeleteUserUseCase } from '@/use-cases/@factories/users/makeDeleteUserUseCase'

export const makeDeleteUserController = (): Controller => {
  const controller = new DeleteUserController(makeDeleteUserUseCase())

  return controller
}
