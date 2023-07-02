import '@ioc/user'

import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { HttpResponse } from '4-framework/http/HttpResponse'
import { container } from '4-framework/ioc/container'
import { middleware } from '4-framework/middleware'
import { UserController } from 'src/3-interfaces/controllers/UserController'
import { USER_TOKENS } from 'src/3-interfaces/tokens/userTokens'
import { ValidateRequestParameters } from 'src/3-interfaces/validators/ValidateRequestParameters'

export async function main(event: APIGatewayProxyEventV2) {
  const controller = container.get<UserController>(USER_TOKENS.UserController)

  const input = ValidateRequestParameters.deleteRoute({
    id: event.pathParameters?.id!,
  })
  if (input.isLeft()) return HttpResponse.makeBadRequest(input.value)

  const response = await controller.deleteEntity(input.value)

  return HttpResponse.makeResponse(response)
}

export const handler = middleware(main)
