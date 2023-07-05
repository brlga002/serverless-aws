import middy from '@middy/core'
import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2WithRequestContext,
} from 'aws-lambda'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { CurrentUser } from '1-domain/auth/CurrentUser'
import { InputSign } from '1-domain/services/TokenService'
import { INTERFACE_TOKENS } from '3-interfaces/tokens/interfaceTokens'
import { ConcreteCurrentUser } from '4-framework/auth/ConcreteCurrentUser'
import { container } from '4-framework/ioc/container'

interface Authorizer extends APIGatewayEventRequestContextV2 {
  authorizer: {
    lambda: InputSign
  }
}

type Event = APIGatewayProxyEventV2WithRequestContext<Authorizer>

const PUBLIC_ROUTES = ['authenticate']

const ensureCurrentUser = (
  request: middy.Request<Event>,
): InputSign | null | never => {
  const authorizer = request.event.requestContext?.authorizer?.lambda ?? null
  const rawPath = request.event.rawPath
  const [, route] = rawPath.split('/')

  if (!authorizer && !PUBLIC_ROUTES.includes(route))
    throw ApplicationError.unauthorized()

  return authorizer
}

export const authCurrentUser = (): middy.MiddlewareObj<Event> => {
  return {
    before: async (request: middy.Request<Event>): Promise<void> => {
      const authorizer = ensureCurrentUser(request)
      if (authorizer) {
        const user = new ConcreteCurrentUser(
          authorizer.userId,
          authorizer.tenantId,
          authorizer.role,
        )
        container
          .bind<CurrentUser>(INTERFACE_TOKENS.CurrentUser)
          .toConstantValue(user)
      }
    },
  }
}
