import { Controller } from '@/presentation/protocols'
import { UpdateUserController } from '@/presentation/protocols/controllers/UpdateUserController'
import { makeUpdateUserUseCase } from '@/use-cases/@factories/users/makeUpdateUserUseCase'

export const makeUpdateUserController = (): Controller => {
  const controller = new UpdateUserController(makeUpdateUserUseCase())

  return controller
}
