import { Controller } from '@/presentation/protocols'
import { FindUserByEmailController } from '@/presentation/protocols/controllers/FindUserByEmailcontroller'
import { makeFindUserByEmailUseCase } from '@/use-cases/@factories/users/makeFindUserByEmailUseCase'

export const makeFindUserByEmailController = (): Controller => {
  const controller = new FindUserByEmailController(makeFindUserByEmailUseCase())

  return controller
}
