import { StackContext, use } from 'sst/constructs'

import { ApiGatewayStack } from './ApiGatewayStack'

export function BeerStack({ stack }: StackContext) {
  const { api } = use(ApiGatewayStack)

  api.addRoutes(stack, {
    'POST /beers/beer-style': {
      function:
        'src/4-framework/functions/beer/findBeerStyleAndPlaylist.handler',
      authorizer: 'none',
    },
    'POST /beers': 'src/4-framework/functions/beer/create.handler',
    'GET /beers': 'src/4-framework/functions/beer/list.handler',
    'GET /beers/{id}': 'src/4-framework/functions/beer/get.handler',
    'PUT /beers/{id}': 'src/4-framework/functions/beer/update.handler',
    'DELETE /beers/{id}': 'src/4-framework/functions/beer/delete.handler',
  })
}
