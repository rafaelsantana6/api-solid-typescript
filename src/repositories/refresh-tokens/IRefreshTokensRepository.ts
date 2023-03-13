import { Prisma, RefreshToken } from '@prisma/client'

export interface IRefreshTokensRepository {
  create(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken>
  findById(id: string): Promise<RefreshToken | null>
  delete(id: string): Promise<void>
}
