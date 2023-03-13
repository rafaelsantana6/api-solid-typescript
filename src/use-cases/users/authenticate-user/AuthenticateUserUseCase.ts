import { compare } from 'bcryptjs'

import { UnauthorizedError } from '@/errors/ApiErrors'
import { GenerateTokenProvider } from '@/providers/GenerateTokenProvider'
import { GenerateRefreshTokenProvider } from '@/providers/GenerateRefreshTokenProvider'
import { IUsersRepository } from '@/repositories/users/IUsersRepository'
import { User } from '@prisma/client'
import { IRefreshTokensRepository } from '@/repositories/refresh-tokens/IRefreshTokensRepository'

interface IAuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateUserUseCaseResponse {
  user: Omit<User, 'passwordHash'>
  refreshToken: string
  token: string
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private refreshTokensRepository: IRefreshTokensRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserUseCaseRequest): Promise<IAuthenticateUserUseCaseResponse> {
    if (!email || !password) {
      throw new UnauthorizedError('Email and password fields are required')
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError('Invalid email or password')
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid email or password')
    }

    const generateTokenProvider = new GenerateTokenProvider()

    const payload = {}

    const token = await generateTokenProvider.execute({
      payload,
      userId: user.id,
    })

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()

    const refreshTokenObject = await generateRefreshTokenProvider.execute(
      user.id
    )

    const refreshToken = await this.refreshTokensRepository.create(
      refreshTokenObject
    )

    const { passwordHash, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      refreshToken: refreshToken.id,
      token,
    }
  }
}
