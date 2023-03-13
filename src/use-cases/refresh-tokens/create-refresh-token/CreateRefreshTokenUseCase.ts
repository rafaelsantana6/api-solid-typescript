import { UnauthorizedError } from '@/errors/ApiErrors'
import { GenerateRefreshTokenProvider } from '@/providers/GenerateRefreshTokenProvider'
import { IRefreshTokensRepository } from '@/repositories/refresh-tokens/IRefreshTokensRepository'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { RefreshToken } from '@prisma/client'

interface ICreateRefreshTokenUseCaseRequest {
  userId: string
}

interface ICreateRefreshTokenUseCaseResponse {
  refreshToken: RefreshToken
}

export class CreateRefreshTokenUseCase {
  constructor(
    private refreshTokensRepository: IRefreshTokensRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    userId,
  }: ICreateRefreshTokenUseCaseRequest): Promise<ICreateRefreshTokenUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findById(userId)

    if (!userAlreadyExists) {
      throw new UnauthorizedError('Invalid user')
    }

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()

    const refreshTokenObject = await generateRefreshTokenProvider.execute(
      userId
    )

    const createRefreshToken = await this.refreshTokensRepository.create(
      refreshTokenObject
    )

    return {
      refreshToken: createRefreshToken,
    }
  }
}
