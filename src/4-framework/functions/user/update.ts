import '@ioc/user'

import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { INTERFACE_TOKENS } from '3-interfaces/tokens/interfaceTokens'
import { HttpResponse } from '4-framework/http/HttpResponse'
import { container } from '4-framework/ioc/container'
import { middleware } from '4-framework/middleware'
import { UserController } from 'src/3-interfaces/controllers/UserController'
import { ValidateUserRequest } from 'src/3-interfaces/validators/ValidateUserRequest'

export async function main(event: APIGatewayProxyEventV2) {
  const controller = container.get<UserController>(
    INTERFACE_TOKENS.UserController,
  )

  const input = ValidateUserRequest.updateEntity({
    ...event.pathParameters,
    ...(event.body as unknown as object),
  })
  if (input.isLeft()) return HttpResponse.makeBadRequest(input.value)

  const response = await controller.updateEntity(input.value)

  return HttpResponse.makeResponse(response)
}

export const handler = middleware(main)
