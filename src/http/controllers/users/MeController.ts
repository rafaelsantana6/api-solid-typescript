import { makeMeUseCase } from '@/use-cases/@factories/users/makeMeUseCase'
import { User } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ApiError } from '@/errors/ApiErrors'

interface IRequest {
  userDetails?: Omit<User, 'passwordHash'>
}

class MeController {
  async handle(req: FastifyRequest & IRequest, res: FastifyReply) {
    const meUseCase = makeMeUseCase()

    if (!req.userDetails) {
      throw new ApiError('req.userDetails not found')
    }

    const userData = await meUseCase.execute({
      userId: req.userDetails.id,
    })

    return res.status(200).send(userData)
  }
}

export { MeController }
