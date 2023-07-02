import { Api, StackContext } from 'sst/constructs'

export const USER_ROUTES = {
  'POST /authenticate':
    'src/4-framework/functions/auth/authenticateUser.handler',
  'POST /tests': 'src/4-framework/functions/test/test.handler',
  'POST /users': 'src/4-framework/functions/user/create.handler',
  'GET /users': 'src/4-framework/functions/user/list.handler',
  'GET /users/{id}': 'src/4-framework/functions/user/get.handler',
  'PUT /users/{id}': 'src/4-framework/functions/user/update.handler',
  'DELETE /users/{id}': 'src/4-framework/functions/user/delete.handler',
}

export type UserRouteKey = keyof typeof USER_ROUTES

export type UserRoutes = Record<UserRouteKey, any>

export function UserStack({ stack }: StackContext) {
  const api = new Api(stack, 'PmocApiGateway', {
    routes: {
      ...USER_ROUTES,
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })
}
