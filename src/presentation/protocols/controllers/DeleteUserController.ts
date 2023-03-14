import { noContent, ok } from '@/presentation/helpers/http-helper'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user/DeleteUserUseCase'
import { z } from 'zod'
import { Controller } from '../controller'
import { HttpResponse } from '../http'

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: DeleteUserController.Request): Promise<HttpResponse> {
    const requestParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = requestParamsSchema.parse(request)

    await this.deleteUserUseCase.execute({
      userId: id,
    })

    return noContent()
  }
}

export namespace DeleteUserController {
  export type Request = {
    id: string
  }
}
