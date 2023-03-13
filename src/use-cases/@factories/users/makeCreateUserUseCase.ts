import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { CreateUserUseCase } from '@/use-cases/users/create-user/CreateUserUseCase'

export const makeCreateUserUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
