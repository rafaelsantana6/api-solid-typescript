import { verify } from 'jsonwebtoken'

import { UnauthorizedError } from '@/errors/ApiErrors'
import { env } from '@/env'
import { User } from '@prisma/client'
import { makeFindUserByIdUseCase } from '@/use-cases/@factories/users/makeFindUserByIdUseCase'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

interface IPayload {
  userFunction: string
  iat: number
  exp: number
  sub: string
}

interface IRequest {
  userDetails?: Omit<User, 'passwordHash'>
}

async function ensureAuthenticated(req: FastifyRequest & IRequest) {
  const ensureAuthenticatedHeadersSchema = z.object({
    authorization: z.string().optional(),
  })

  let token = req.cookies.token

  let { authorization } = ensureAuthenticatedHeadersSchema.parse(req.headers)

  if (!authorization) {
    if (!token) {
      throw new UnauthorizedError('Missing token')
    }
  } else {
    const [schema, bearerToken] = authorization.split(' ')

    if (!/^Bearer$/i.test(schema)) {
      throw new UnauthorizedError('Token malformatted')
    }

    token = bearerToken
  }

  try {
    const { sub } = verify(token, env.AUTH_SECRET) as IPayload

    const findUserByIdUseCase = makeFindUserByIdUseCase()

    const userDetails = await findUserByIdUseCase.execute({ userId: sub })

    req.userDetails = userDetails.user
  } catch (err: any) {
    throw new UnauthorizedError(`Invalid token: ${err.message}`)
  }
}

export { ensureAuthenticated }
