import 'reflect-metadata'

import {
  APIGatewayAuthorizerResult,
  APIGatewayAuthorizerResultContext,
  APIGatewayProxyEventV2,
} from 'aws-lambda'

import { CurrentUser } from '1-domain/auth/CurrentUser'
import { JwtTokenService } from '4-framework/services/JwtTokenService'

export const handler = (event: APIGatewayProxyEventV2) => {
  const token = getToken(event)
  if (!token) return buildResult('Deny')

  const jwtTokenService = new JwtTokenService()

  const result = jwtTokenService.verify(token)

  if (result.isLeft()) return buildResult('Deny')

  const user: CurrentUser = result.value

  return buildResult('Allow', user)
}

function getToken(event: APIGatewayProxyEventV2): string | null {
  const [, token] = event.headers.authorization?.split('Bearer ') ?? []
  if (!token) return null
  return token
}

function buildResult(
  effect: 'Allow' | 'Deny',
  user?: CurrentUser,
): APIGatewayAuthorizerResult {
  return {
    principalId: user?.userId ?? 'no user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: '*',
        },
      ],
    },
    context: user as unknown as APIGatewayAuthorizerResultContext,
  }
}
