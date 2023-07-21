import '@ioc/user'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { INTERFACE_TOKENS } from '3-interfaces/tokens/interfaceTokens'
import { HttpResponse } from '4-framework/http/HttpResponse'
import { container } from '4-framework/ioc/container'
import { middleware } from '4-framework/middleware'
import { UpdateUserPasswordController } from 'src/3-interfaces/controllers/UpdateUserPasswordController'
import { ValidateUserRequest } from 'src/3-interfaces/validators/ValidateUserRequest'

export async function main(event: APIGatewayProxyEventV2) {
  const controller = container.get<UpdateUserPasswordController>(
    INTERFACE_TOKENS.UpdateUserPasswordController,
  )

  const input = ValidateUserRequest.updateUserPassword(event.body)
  if (input.isLeft()) return HttpResponse.makeBadRequest(input.value)

  const response = await controller.updateUserPassword(input.value)

  return HttpResponse.makeResponse(response)
}

export const handler = middleware(main)
