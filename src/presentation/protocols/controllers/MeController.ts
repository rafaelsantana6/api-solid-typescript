import { ApiError } from '@/errors/ApiErrors'
import { ok } from '@/presentation/helpers/http-helper'
import { MeUseCase } from '@/use-cases/users/me/MeUseCase'
import { User } from '@prisma/client'
import { Controller } from '../controller'
import { HttpResponse } from '../http'

export class MeController implements Controller {
  constructor(private readonly meUseCase: MeUseCase) {}

  async handle(request: MeController.Request): Promise<HttpResponse> {
    if (!request.userDetails) {
      throw new ApiError('req.userDetails not found')
    }

    const userData = await this.meUseCase.execute({
      userId: request.userDetails.id,
    })

    return ok(userData)
  }
}

export namespace MeController {
  export type Request = {
    userDetails?: Omit<User, 'passwordHash'>
  }
}
