import { Request, Response } from 'express'

import { makeFindUserByIdUseCase } from '@/use-cases/@factories/users/makeFindUserByIdUseCase'

class FindUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const findUserByIdUseCase = makeFindUserByIdUseCase()

    const user = await findUserByIdUseCase.execute({ userId: id })

    return res.status(200).json(user)
  }
}

export { FindUserByIdController }
