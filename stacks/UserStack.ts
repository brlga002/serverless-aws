import { StackContext, use } from 'sst/constructs'

import { ApiGatewayStack } from './ApiGatewayStack'

export function UserStack({ stack }: StackContext) {
  const { api } = use(ApiGatewayStack)

  api.addRoutes(stack, {
    'POST /users': {
      function: 'src/4-framework/functions/user/create.handler',
      authorizer: 'none',
    },
    'GET /users': 'src/4-framework/functions/user/list.handler',
    'GET /users/{id}': 'src/4-framework/functions/user/get.handler',
    'PUT /users/{id}': 'src/4-framework/functions/user/update.handler',
    'DELETE /users/{id}': 'src/4-framework/functions/user/delete.handler',
  })
}
