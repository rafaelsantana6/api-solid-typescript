import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { MeUseCase } from '@/use-cases/users/me/MeUseCase'

export const makeMeUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const meUseCase = new MeUseCase(usersRepository)

  return meUseCase
}
