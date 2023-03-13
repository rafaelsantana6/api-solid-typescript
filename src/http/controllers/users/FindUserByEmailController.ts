import { Request, Response } from 'express'

import { makeFindUserByEmailUseCase } from '@/use-cases/@factories/users/makeFindUserByEmailUseCase'

export class FindUserByEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.params

    const findUserByEmailUseCase = makeFindUserByEmailUseCase()

    const user = await findUserByEmailUseCase.execute({ email })

    return res.status(200).json(user)
  }
}
