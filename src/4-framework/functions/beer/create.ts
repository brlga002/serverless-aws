import '@ioc/beer'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { INTERFACE_TOKENS } from '3-interfaces/tokens/interfaceTokens'
import { HttpResponse } from '4-framework/http/HttpResponse'
import { container } from '4-framework/ioc/container'
import { middleware } from '4-framework/middleware'
import { BeerController } from 'src/3-interfaces/controllers/BeerController'
import { ValidateBeerRequest } from 'src/3-interfaces/validators/ValidateBeerRequest'

export async function main(event: APIGatewayProxyEventV2) {
  const controller = container.get<BeerController>(
    INTERFACE_TOKENS.BeerController,
  )

  const input = ValidateBeerRequest.createEntity(event.body)
  if (input.isLeft()) return HttpResponse.makeBadRequest(input.value)

  const response = await controller.createEntity(input.value)

  return HttpResponse.makeResponse(response)
}

export const handler = middleware(main)
