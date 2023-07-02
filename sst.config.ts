import { SSTConfig } from 'sst'

import { UserStack } from './stacks/UserStack'

export default {
  config(_input) {
    return {
      name: 'pmoc',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(UserStack)
  },
} satisfies SSTConfig
