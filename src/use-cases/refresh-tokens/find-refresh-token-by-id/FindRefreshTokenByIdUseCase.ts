import { UnauthorizedError } from '@/errors/ApiErrors'
import { IRefreshTokensRepository } from '@/repositories/refresh-tokens/IRefreshTokensRepository'
import { RefreshToken } from '@prisma/client'

interface IGetRefreshTokenUseCaseRequest {
  refreshTokenId: string
}

interface IGetRefreshTokenUseCaseResponse {
  refreshToken: RefreshToken
}

export class FindRefreshTokenByIdUseCase {
  constructor(private refreshTokensRepository: IRefreshTokensRepository) {}

  async execute({
    refreshTokenId,
  }: IGetRefreshTokenUseCaseRequest): Promise<IGetRefreshTokenUseCaseResponse> {
    const refreshToken = await this.refreshTokensRepository.findById(
      refreshTokenId
    )

    if (!refreshToken) {
      throw new UnauthorizedError('Invalid refresh token')
    }

    return {
      refreshToken,
    }
  }
}
