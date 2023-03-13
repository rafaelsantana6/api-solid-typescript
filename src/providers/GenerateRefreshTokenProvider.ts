import moment from 'moment'
import { randomUUID } from 'node:crypto'

import { RefreshToken } from '@prisma/client'

export class GenerateRefreshTokenProvider {
  async execute(userId: string): Promise<RefreshToken> {
    const tokenExpirationTimeInSeconds = 60 * 60 * 24 * 30 // 30 days

    const expiresIn = moment()
      .add(tokenExpirationTimeInSeconds, 'seconds')
      .unix()

    const refreshToken = {
      id: randomUUID(),
      expiresIn,
      userId,
    }

    return refreshToken
  }
}
