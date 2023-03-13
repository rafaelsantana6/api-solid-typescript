import { PrismaRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/PrismaRefreshTokensRepository'
import { RefreshUserTokenUseCase } from '@/use-cases/refresh-tokens/refresh-user-token/RefreshUserTokenUseCase'

export const makeRefreshUserTokenUseCase = () => {
  const refreshTokensRepository = new PrismaRefreshTokensRepository()

  const refreshUserTokenUseCase = new RefreshUserTokenUseCase(
    refreshTokensRepository
  )

  return refreshUserTokenUseCase
}
