import { Request, Response } from 'express'

import { makeDeleteUserUseCase } from '@/use-cases/@factories/users/makeDeleteUserUseCase'

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const deleteUserUseCase = makeDeleteUserUseCase()

    await deleteUserUseCase.execute({ userId: id })

    return res.status(204).send()
  }
}

export { DeleteUserController }
