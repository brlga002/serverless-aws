import { SSTConfig } from 'sst'

import { ApiGatewayStack } from 'stacks/ApiGatewayStack'

import { UserStack } from './stacks/UserStack'

export default {
  config(_input) {
    return {
      name: 'pmoc',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(ApiGatewayStack).stack(UserStack)
  },
} satisfies SSTConfig
