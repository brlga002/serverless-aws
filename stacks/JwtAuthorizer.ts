import { ApiAuthorizer, Function, Stack } from 'sst/constructs'

export const JwtAuthorizer = (stack: Stack): ApiAuthorizer => {
  const handler = new Function(stack, 'JwtAuthorizer', {
    handler: 'src/4-framework/auth/LambdaAuthorizer.handler',
  })

  return {
    type: 'lambda',
    function: handler,
    resultsCacheTtl: '3 minutes',
    identitySource: ['$request.header.Authorization', '$request.header.code'],
  }
}
