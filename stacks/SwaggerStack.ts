import { StackContext, StaticSite, use } from 'sst/constructs'

import { ApiGatewayStack } from './ApiGatewayStack'

export function SwaggerStack({ stack }: StackContext) {
  const { api } = use(ApiGatewayStack)

  const site = new StaticSite(stack, 'SwaggerStack', {
    path: 'src/4-framework/openapi/swagger',
    dev: {
      deploy: true,
    },
    buildCommand: 'npm run openapi',
    replaceValues: [
      {
        files: '*.json',
        search: '{{ API_URL }}',
        replace: api.url,
      },
    ],
  })

  stack.addOutputs({
    SwaggerUrl: site.url,
  })
}
