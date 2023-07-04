import { ApiAuthorizer, Function, Stack } from 'sst/constructs'

export const JwtAuthorizer = (stack: Stack): ApiAuthorizer => {
  const handler = new Function(stack, 'JwtAuthorizer', {
    environment: { JWT_APPLICATION_KEY: process.env.JWT_APPLICATION_KEY! },
    handler: 'src/4-framework/auth/LambdaAuthorizer.handler',
  })

  return {
    type: 'lambda',
    function: handler,
    resultsCacheTtl: '10 minutes',
    identitySource: ['$request.header.Authorization'],
  }
}
