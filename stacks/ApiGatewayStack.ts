import { Api, StackContext } from 'sst/constructs'

import { JwtAuthorizer } from './JwtAuthorizer'

export function ApiGatewayStack({ stack }: StackContext) {
  const api = new Api(stack, 'ApiGatewayPmoc', {
    routes: {
      'POST /authenticate': {
        function: 'src/4-framework/functions/auth/authenticateUser.handler',
        authorizer: 'none',
      },
    },
    authorizers: {
      JwtAuthorizer: JwtAuthorizer(stack),
    },
    defaults: {
      authorizer: 'JwtAuthorizer',
    },
  })

  return { api }
}
