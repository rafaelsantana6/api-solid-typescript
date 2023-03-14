import { expect, describe, it, beforeEach } from 'vitest'
import { UnauthorizedError } from '@/errors/ApiErrors'
import { InMemoryRefreshTokensRepository } from '@/repositories/refresh-tokens/implementations/InMemoryRefreshTokensRepository'
import moment from 'moment'
import { randomUUID } from 'node:crypto'
import { RefreshUserTokenUseCase } from './RefreshUserTokenUseCase'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let sut: RefreshUserTokenUseCase

describe('Refresh User Token Use Case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    sut = new RefreshUserTokenUseCase(refreshTokensRepository)
  })

  it('should be able to refresh a user token', async () => {
    const createRefreshToken = await refreshTokensRepository.create({
      id: randomUUID(),
      expiresIn: moment().add(300, 'seconds').unix(),
      userId: 'some-user-id',
    })

    const refresh = await sut.execute({
      refreshToken: createRefreshToken.id,
    })

    expect(refresh.refreshToken).not.toBe(createRefreshToken.id)
    expect(refresh).toHaveProperty('token')
  })

  it('should NOT be able to refresh a inexistent token', async () => {
    await refreshTokensRepository.create({
      id: randomUUID(),
      expiresIn: moment().add(300, 'seconds').unix(),
      userId: 'some-user-id',
    })

    expect(async () => {
      await sut.execute({ refreshToken: 'inexistent-id' })
    }).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
