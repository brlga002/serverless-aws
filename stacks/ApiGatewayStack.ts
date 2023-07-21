import { Api, StackContext } from 'sst/constructs'

import { JwtAuthorizer } from './JwtAuthorizer'

export function ApiGatewayStack({ stack }: StackContext) {
  const api = new Api(stack, 'ApiGatewayKarhub', {
    routes: {
      'POST /authenticate/login': {
        function: 'src/4-framework/functions/auth/authenticateUser.handler',
        authorizer: 'none',
      },
      'PUT /authenticate/password':
        'src/4-framework/functions/auth/updateUserPassword.handler',
    },
    authorizers: {
      JwtAuthorizer: JwtAuthorizer(stack),
    },
    defaults: {
      authorizer: 'JwtAuthorizer',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return { api }
}
