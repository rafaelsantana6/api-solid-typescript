import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindUserByIdUseCase } from '@/use-cases/@factories/users/makeFindUserByIdUseCase'

class FindUserByIdController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const findUserByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = findUserByIdParamsSchema.parse(req.params)

    const findUserByIdUseCase = makeFindUserByIdUseCase()

    const user = await findUserByIdUseCase.execute({ userId: id })

    return res.status(200).send(user)
  }
}

export { FindUserByIdController }
