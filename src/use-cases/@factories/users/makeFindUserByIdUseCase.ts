import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { FindUserByIdUseCase } from '@/use-cases/users/find-user-by-id/FindUserByIdUseCase'

export const makeFindUserByIdUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)

  return findUserByIdUseCase
}
