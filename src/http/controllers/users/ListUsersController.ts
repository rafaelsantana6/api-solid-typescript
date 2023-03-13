import { Request, Response } from 'express'

import { makeListUsersUseCase } from '@/use-cases/@factories/users/makeListUsersUseCase'

export class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listUsersUseCase = makeListUsersUseCase()

    const users = await listUsersUseCase.execute()

    return res.status(200).json(users)
  }
}
