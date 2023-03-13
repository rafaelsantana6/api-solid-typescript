import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UnauthorizedError } from '@/errors/ApiErrors'
import { env } from '@/env'
import { User } from '@prisma/client'
import { makeFindUserByIdUseCase } from '@/use-cases/@factories/users/makeFindUserByIdUseCase'

interface IPayload {
  userFunction: string
  iat: number
  exp: number
  sub: string
}

interface IRequest {
  userDetails: User
}

async function ensureAuthenticated(
  req: Request & IRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedError('Missing token')
  }

  const [scheme, token] = authHeader.split(' ')

  if (!/^Bearer$/i.test(scheme)) {
    throw new UnauthorizedError('Token malformatted')
  }

  try {
    const { sub: userId } = verify(token, env.AUTH_SECRET) as IPayload

    const findUserByIdUseCase = makeFindUserByIdUseCase()

    const userDetails = await findUserByIdUseCase.execute({ userId })

    // TODO: fix this error
    req.userDetails = userDetails

    return next()
  } catch (error) {
    throw new UnauthorizedError(`Invalid token: ${error.message}`)
  }
}

export { ensureAuthenticated }
