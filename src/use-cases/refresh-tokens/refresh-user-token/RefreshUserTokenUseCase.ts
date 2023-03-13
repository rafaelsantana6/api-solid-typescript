import { GenerateTokenProvider } from '@/providers/GenerateTokenProvider'
import { IRefreshTokensRepository } from '@/repositories/refresh-tokens/IRefreshTokensRepository'
import { UnauthorizedError } from '@/errors/ApiErrors'
import { GenerateRefreshTokenProvider } from '@/providers/GenerateRefreshTokenProvider'

interface IRefreshUserTokenUseCaseRequest {
  refreshToken: string
}

interface IRefreshUserTokenUseCaseResponse {
  refreshToken: string
  token: string
}

export class RefreshUserTokenUseCase {
  constructor(private refreshTokensRepository: IRefreshTokensRepository) {}

  async execute({
    refreshToken,
  }: IRefreshUserTokenUseCaseRequest): Promise<IRefreshUserTokenUseCaseResponse> {
    const refreshTokenExists = await this.refreshTokensRepository.findById(
      refreshToken
    )

    if (!refreshTokenExists) {
      throw new UnauthorizedError('Invalid refresh token')
    }

    await this.refreshTokensRepository.delete(refreshToken)

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()

    const refreshTokenObject = await generateRefreshTokenProvider.execute(
      refreshTokenExists.userId
    )

    const newRefreshToken = await this.refreshTokensRepository.create(
      refreshTokenObject
    )

    const generateTokenProvider = new GenerateTokenProvider()

    const token = await generateTokenProvider.execute({
      userId: refreshTokenExists.userId,
    })

    return {
      refreshToken: newRefreshToken.id,
      token,
    }
  }
}
