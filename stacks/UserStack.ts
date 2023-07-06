import { StackContext, use } from 'sst/constructs'

import { ApiGatewayStack } from './ApiGatewayStack'

export const OTHERS_ROUTES = {
  'POST /test-app/{id}': 'src/4-framework/functions/test/test.handler',
}

export const USER_ROUTES = {
  'POST /users': 'src/4-framework/functions/user/create.handler',
  'GET /users': 'src/4-framework/functions/user/list.handler',
  'GET /users/{id}': 'src/4-framework/functions/user/get.handler',
  'PUT /users/{id}': 'src/4-framework/functions/user/update.handler',
  'DELETE /users/{id}': 'src/4-framework/functions/user/delete.handler',
}

export function UserStack({ stack }: StackContext) {
  const { api } = use(ApiGatewayStack)

  api.addRoutes(stack, {
    ...OTHERS_ROUTES,
    ...USER_ROUTES,
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })
}
