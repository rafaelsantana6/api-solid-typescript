import { makeRefreshUserTokenUseCase } from '@/use-cases/@factories/refresh-tokens/makeRefreshUserTokenUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class RefreshUserTokenController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const refreshUserTokenBodySchema = z.object({
      refreshToken: z.string().uuid(),
    })

    const { refreshToken } = refreshUserTokenBodySchema.parse(req.body)

    const refreshUserTokenUseCase = makeRefreshUserTokenUseCase()

    const newTokens = await refreshUserTokenUseCase.execute({ refreshToken })

    return res
      .status(200)
      .setCookie('refreshToken', newTokens.refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .setCookie('token', newTokens.token, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send(newTokens)
  }
}
