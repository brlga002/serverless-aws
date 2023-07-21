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
    app.setDefaultFunctionProps({
      runtime: 'nodejs16.x',
    })

    app.addDefaultFunctionEnv({
      MONGO_URI: process.env.MONGO_URI!,
      JWT_APPLICATION_KEY: process.env.JWT_APPLICATION_KEY!,
    })

    app.stack(ApiGatewayStack).stack(UserStack).stack(TenantStack)
  },
} satisfies SSTConfig
