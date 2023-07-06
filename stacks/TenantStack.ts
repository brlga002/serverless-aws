import { StackContext, use } from 'sst/constructs'

import { ApiGatewayStack } from './ApiGatewayStack'

export function TenantStack({ stack }: StackContext) {
  const { api } = use(ApiGatewayStack)

  api.addRoutes(stack, {
    'POST /tenants': 'src/4-framework/functions/tenant/create.handler',
    'GET /tenants': 'src/4-framework/functions/tenant/list.handler',
    'GET /tenants/{id}': 'src/4-framework/functions/tenant/get.handler',
    'PUT /tenants/{id}': 'src/4-framework/functions/tenant/update.handler',
    'DELETE /tenants/{id}': 'src/4-framework/functions/tenant/delete.handler',
  })
}
