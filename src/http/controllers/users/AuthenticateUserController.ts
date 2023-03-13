import { Request, Response } from 'express'
import { z } from 'zod'

import { makeAuthenticateUserUseCase } from '@/use-cases/@factories/users/makeAuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const authenticateUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateUserBodySchema.parse(req.body)

    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const authentication = await authenticateUserUseCase.execute({
      email,
      password,
    })

    return res.json(authentication)
  }
}
