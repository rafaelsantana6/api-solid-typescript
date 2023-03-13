import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { IRefreshTokensRepository } from '../IRefreshTokensRepository'

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {
  async create(data: Prisma.RefreshTokenCreateInput) {
    const refreshToken = await prisma.refreshToken.create({
      data,
    })

    return refreshToken
  }

  async findById(id: string) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        id,
      },
    })

    return refreshToken
  }

  async delete(id: string) {
    await prisma.refreshToken.delete({
      where: {
        id,
      },
    })
  }
}
