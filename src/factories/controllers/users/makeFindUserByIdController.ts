import { Controller } from '@/presentation/protocols'
import { FindUserByIdController } from '@/presentation/protocols/controllers/FindUserByIdController'
import { makeFindUserByIdUseCase } from '@/use-cases/@factories/users/makeFindUserByIdUseCase'

export const makeFindUserByIdController = (): Controller => {
  const controller = new FindUserByIdController(makeFindUserByIdUseCase())

  return controller
}
