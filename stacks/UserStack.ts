import { Api, StackContext } from 'sst/constructs'

import { JwtAuthorizer } from './JwtAuthorizer'

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
  const api = new Api(stack, 'PmocApiGateway', {
    routes: {
      ...USER_ROUTES,
      ...OTHERS_ROUTES,
    },
    authorizers: {
      JwtAuthorizer: JwtAuthorizer(stack),
    },
    defaults: {
      authorizer: 'JwtAuthorizer',
    },
  })

  api.addRoutes(stack, {
    'POST /authenticate': {
      function: 'src/4-framework/functions/auth/authenticateUser.handler',
      authorizer: 'none',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })
}
