import { FastifyReply, FastifyRequest } from 'fastify'

import { makeRefreshUserTokenUseCase } from '@/use-cases/@factories/refresh-tokens/makeRefreshUserTokenUseCase'
import { UnauthorizedError } from '@/errors/ApiErrors'

export class GetRefreshUserTokenController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      throw new UnauthorizedError('Missing refreshToken cookie')
    }

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
