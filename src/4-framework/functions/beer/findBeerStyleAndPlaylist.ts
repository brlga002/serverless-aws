import '@ioc/beer'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { INTERFACE_TOKENS } from '3-interfaces/tokens/interfaceTokens'
import { HttpResponse } from '4-framework/http/HttpResponse'
import { container } from '4-framework/ioc/container'
import { middleware } from '4-framework/middleware'
import { BeerStyleAndPlaylistController } from 'src/3-interfaces/controllers/BeerStyleAndPlaylistController'
import { ValidateBeerRequest } from 'src/3-interfaces/validators/ValidateBeerRequest'

export async function main(event: APIGatewayProxyEventV2) {
  const controller = container.get<BeerStyleAndPlaylistController>(
    INTERFACE_TOKENS.BeerStyleAndPlaylistController,
  )

  const input = ValidateBeerRequest.findBeerStyleAndPlaylist(event.body)
  if (input.isLeft()) return HttpResponse.makeBadRequest(input.value)

  const response = await controller.findBeerStyleAndPlaylist(input.value)

  return HttpResponse.makeResponse(response)
}

export const handler = middleware(main)
