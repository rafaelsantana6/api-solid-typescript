import { Controller } from '@/presentation/protocols'
import { MeController } from '@/presentation/protocols/controllers/MeController'
import { makeMeUseCase } from '@/use-cases/@factories/users/makeMeUseCase'

export const makeMeController = (): Controller => {
  const controller = new MeController(makeMeUseCase())

  return controller
}
