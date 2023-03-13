import { makeMeUseCase } from '@/use-cases/@factories/users/makeMeUseCase'
import { User } from '@prisma/client'
import { Request, Response } from 'express'

interface IRequest {
  userDetails: User
}

class MeController {
  async handle(req: Request & IRequest, res: Response): Promise<Response> {
    const meUseCase = makeMeUseCase()

    const { userData } = await meUseCase.execute({ userId: req.userDetails.id })

    return res.status(200).json({ userData })
  }
}

export { MeController }
