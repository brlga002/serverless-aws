import { SSTConfig } from 'sst'

import { ApiGatewayStack } from 'stacks/ApiGatewayStack'
import { TenantStack } from 'stacks/TenantStack'

import { UserStack } from './stacks/UserStack'

export default {
  config(_input) {
    return {
      name: 'pmoc',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(ApiGatewayStack).stack(UserStack).stack(TenantStack)
  },
} satisfies SSTConfig
