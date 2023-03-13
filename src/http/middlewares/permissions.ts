import { NextFunction, Request, Response } from 'express'

import { User } from '@prisma/client'

interface IRequest {
  userDetails: User
}

// TODO: fix these typescript errors

function can(userPermissions: string[]) {
  userPermissions.push('manage_all')

  return async (req: Request & IRequest, res: Response, next: NextFunction) => {
    const { permissions } = req.userDetails

    const permissionsMatch = permissions.some((permission) =>
      userPermissions.includes(permission)
    )

    if (!permissionsMatch) {
      return res.status(403).end()
    }

    return next()
  }
}

function is(userRoles: string[]) {
  return async (req: Request & IRequest, res: Response, next: NextFunction) => {
    const { roles } = req.userDetails

    const rolesMatch = roles.some((role) => userRoles.includes(role))

    if (!rolesMatch) {
      return res.status(403).end()
    }

    return next()
  }
}

export { can, is }
