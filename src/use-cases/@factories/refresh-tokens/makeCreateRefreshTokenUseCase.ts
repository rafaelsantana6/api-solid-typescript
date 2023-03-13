import { PrismaRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/PrismaRefreshTokensRepository'
import { PrismaUsersRepository } from '@/repositories/users/implementations/PrismaUsersRepository'
import { CreateRefreshTokenUseCase } from '@/use-cases/refresh-tokens/create-refresh-token/CreateRefreshTokenUseCase'

export const makeCreateRefreshTokenUseCase = () => {
  const refreshTokensRepository = new PrismaRefreshTokensRepository()
  const usersRepository = new PrismaUsersRepository()

  const createRefreshTokenUseCase = new CreateRefreshTokenUseCase(
    refreshTokensRepository,
    usersRepository
  )

  return createRefreshTokenUseCase
}
