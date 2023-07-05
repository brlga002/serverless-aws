import '@ioc/user'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { INTERFACE_TOKENS } from '3-interfaces/tokens/interfaceTokens'
import { HttpResponse } from '4-framework/http/HttpResponse'
import { container } from '4-framework/ioc/container'
import { middleware } from '4-framework/middleware'
import { AuthUserController } from 'src/3-interfaces/controllers/AuthUserController'
import { ValidateUserRequest } from 'src/3-interfaces/validators/ValidateUserRequest'

export async function main(event: APIGatewayProxyEventV2) {
  const controller = container.get<AuthUserController>(
    INTERFACE_TOKENS.AuthUserController,
  )

  const input = ValidateUserRequest.authUser(event.body)
  if (input.isLeft()) return HttpResponse.makeBadRequest(input.value)

  const response = await controller.authenticateUser(input.value)

  return HttpResponse.makeResponse(response)
}

export const handler = middleware(main)
