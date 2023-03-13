import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { UpdateUserUseCase } from '@/use-cases/users/update-user/UpdateUserUseCase'

export const makeUpdateUserUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const updateUseCase = new UpdateUserUseCase(usersRepository)

  return updateUseCase
}
