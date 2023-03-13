import { makeRefreshUserTokenUseCase } from '@/use-cases/@factories/refresh-tokens/makeRefreshUserTokenUseCase'
import { Request, Response } from 'express'
import { z } from 'zod'

export class RefreshUserTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const refreshUserTokenBodySchema = z.object({
      refreshToken: z.string().uuid(),
    })

    const { refreshToken } = refreshUserTokenBodySchema.parse(req.body)

    const refreshUserTokenUseCase = makeRefreshUserTokenUseCase()

    const newTokens = await refreshUserTokenUseCase.execute({ refreshToken })

    return res.status(200).json(newTokens)
  }
}
