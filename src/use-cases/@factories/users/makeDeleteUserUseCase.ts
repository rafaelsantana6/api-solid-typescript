import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user/DeleteUserUseCase'

export const makeDeleteUserUseCase = () => {
  const usersRepository = new PrismaUsersRepository()

  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUserUseCase
}
