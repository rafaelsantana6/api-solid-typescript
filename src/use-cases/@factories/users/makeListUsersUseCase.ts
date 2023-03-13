import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { ListUsersUseCase } from '@/use-cases/users/list-users/ListUsersUseCase'

export const makeListUsersUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const listUsersUseCase = new ListUsersUseCase(usersRepository)

  return listUsersUseCase
}
