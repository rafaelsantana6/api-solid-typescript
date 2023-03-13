import { Prisma, RefreshToken } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { IRefreshTokensRepository } from '../IRefreshTokensRepository'

export class InMemoryRefreshTokensRepository
  implements IRefreshTokensRepository
{
  public refreshTokens: RefreshToken[] = []

  async create(data: Prisma.RefreshTokenCreateInput) {
    const refreshToken: RefreshToken = {
      id: randomUUID(),
      expiresIn: data.expiresIn,
      userId: data.userId,
    }

    this.refreshTokens.push(refreshToken)

    return refreshToken
  }

  async findById(id: string) {
    const refreshToken = this.refreshTokens.find(
      (refreshToken) => refreshToken.id === id
    )

    if (!refreshToken) return null

    return refreshToken
  }

  async delete(id: string) {
    const refreshTokens = this.refreshTokens

    const index = this.refreshTokens.findIndex(
      (refreshToken) => refreshToken.id === id
    )

    refreshTokens.splice(index, 1)
  }
}
