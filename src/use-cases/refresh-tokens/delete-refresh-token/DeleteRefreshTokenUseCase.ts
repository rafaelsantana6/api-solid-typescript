import { NotFoundError } from '@/errors/ApiErrors'
import { IRefreshTokensRepository } from '@/repositories/refresh-tokens/IRefreshTokensRepository'

interface DeleteRefreshTokenUseCaseRequest {
  refreshTokenId: string
}

export class DeleteRefreshTokenUseCase {
  constructor(private refreshTokensRepository: IRefreshTokensRepository) {}

  async execute({ refreshTokenId }: DeleteRefreshTokenUseCaseRequest) {
    const refreshTokenAlreadyExists =
      await this.refreshTokensRepository.findById(refreshTokenId)

    if (!refreshTokenAlreadyExists) {
      throw new NotFoundError('Refresh token does not exists')
    }

    await this.refreshTokensRepository.delete(refreshTokenId)
  }
}
