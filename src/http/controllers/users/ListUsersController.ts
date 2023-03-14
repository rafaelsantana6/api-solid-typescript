import { FastifyReply, FastifyRequest } from 'fastify'

import { makeListUsersUseCase } from '@/use-cases/@factories/users/makeListUsersUseCase'

export class ListUsersController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const listUsersUseCase = makeListUsersUseCase()

    const users = await listUsersUseCase.execute()

    return res.status(200).send(users)
  }
}
