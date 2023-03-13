import { PrismaRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/PrismaRefreshTokensRepository'
import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { AuthenticateUserUseCase } from '@/use-cases/users/authenticate-user/AuthenticateUserUseCase'

export const makeAuthenticateUserUseCase = () => {
  const usersRepository = new PrismaUsersRepository()
  const refreshTokensRepository = new PrismaRefreshTokensRepository()

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    refreshTokensRepository
  )

  return authenticateUserUseCase
}
