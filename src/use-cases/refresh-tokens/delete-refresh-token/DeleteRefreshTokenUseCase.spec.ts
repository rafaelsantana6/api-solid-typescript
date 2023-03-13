import { NotFoundError } from '@/errors/ApiErrors'
import { GenerateRefreshTokenProvider } from '@/providers/GenerateRefreshTokenProvider'
import { InMemoryRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/InMemoryRefreshTokensRepository'
import { hash } from 'bcryptjs'
import { DeleteRefreshTokenUseCase } from './DeleteRefreshTokenUseCase'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let sut: DeleteRefreshTokenUseCase

describe('Delete Refresh Token Use Case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    sut = new DeleteRefreshTokenUseCase(refreshTokensRepository)
  })

  it('should be able to delete a refresh token', async () => {
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()

    const refreshTokenObject = await generateRefreshTokenProvider.execute(
      'some-user-id'
    )

    const refreshToken = await refreshTokensRepository.create(
      refreshTokenObject
    )

    const beforeExclusion = await refreshTokensRepository.findById(
      refreshToken.id
    )

    expect(beforeExclusion).toHaveProperty('userId')
    expect(beforeExclusion).toHaveProperty('id')
    expect(beforeExclusion).toHaveProperty('expiresIn')
    expect(typeof beforeExclusion?.expiresIn).toBe('number')

    await sut.execute({ refreshTokenId: refreshToken.id })

    const users = await refreshTokensRepository.findById(refreshToken.id)

    expect(users).toBeNull()
  })

  it('should NOT be able to delete a inexistent refresh token', async () => {
    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()

    const refreshTokenObject = await generateRefreshTokenProvider.execute(
      'some-user-id'
    )

    await refreshTokensRepository.create(refreshTokenObject)

    expect(async () => {
      await sut.execute({ refreshTokenId: 'inexistent-id' })
    }).rejects.toBeInstanceOf(NotFoundError)
  })
})
