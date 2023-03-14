import { expect, describe, it, beforeEach } from 'vitest'
import { UnauthorizedError } from '@/errors/ApiErrors'
import { GenerateRefreshTokenProvider } from '@/providers/GenerateRefreshTokenProvider'
import { InMemoryRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/InMemoryRefreshTokensRepository'
import { FindRefreshTokenByIdUseCase } from './FindRefreshTokenByIdUseCase'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let sut: FindRefreshTokenByIdUseCase

describe('Find Refresh Token By id Use Case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    sut = new FindRefreshTokenByIdUseCase(refreshTokensRepository)
  })

  it('should be able to find a refresh token by id', async () => {
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()

    const refreshTokenObject = await generateRefreshTokenProvider.execute(
      'some-user-id'
    )

    const createRefreshToken = await refreshTokensRepository.create(
      refreshTokenObject
    )

    await sut.execute({ refreshTokenId: createRefreshToken.id })

    const refreshToken = await refreshTokensRepository.findById(
      createRefreshToken.id
    )

    expect(refreshToken).toHaveProperty('id')
    expect(refreshToken).toHaveProperty('userId')
    expect(refreshToken).toHaveProperty('expiresIn')
    expect(typeof refreshToken?.expiresIn).toBe('number')
  })

  it('should NOT be able to find a inexistent refresh token', async () => {
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()

    const refreshTokenObject = await generateRefreshTokenProvider.execute(
      'some-user-id'
    )

    await refreshTokensRepository.create(refreshTokenObject)

    expect(async () => {
      await sut.execute({ refreshTokenId: 'inexistent-id' })
    }).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
