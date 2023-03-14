import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateUserUseCase } from '@/use-cases/@factories/users/makeAuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const authenticateUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateUserBodySchema.parse(req.body)

    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const { user, token, refreshToken } = await authenticateUserUseCase.execute(
      {
        email,
        password,
      }
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .setCookie('token', token, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        user,
        refreshToken,
        token,
      })
  }
}
