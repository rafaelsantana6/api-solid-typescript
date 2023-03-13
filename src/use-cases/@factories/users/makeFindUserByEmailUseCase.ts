import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { FindUserByEmailUseCase } from '@/use-cases/users/find-user-by-email/FindUserByEmailUseCase'

export const makeFindUserByEmailUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const findUserByEmailUseCase = new FindUserByEmailUseCase(usersRepository)

  return findUserByEmailUseCase
}
