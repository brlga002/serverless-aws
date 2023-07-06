import '@ioc/user'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { INTERFACE_TOKENS } from '3-interfaces/tokens/interfaceTokens'
import { HttpResponse } from '4-framework/http/HttpResponse'
import { container } from '4-framework/ioc/container'
import { middleware } from '4-framework/middleware'
import { TenantController } from 'src/3-interfaces/controllers/TenantController'
import { ValidateTenantRequest } from 'src/3-interfaces/validators/ValidateTenantRequest'

export async function main(event: APIGatewayProxyEventV2) {
  const controller = container.get<TenantController>(
    INTERFACE_TOKENS.TenantController,
  )

  const input = ValidateTenantRequest.createTenant(
    event.body as unknown as Record<string, unknown>,
  )
  if (input.isLeft()) return HttpResponse.makeBadRequest(input.value)

  const response = await controller.createEntity(input.value)

  return HttpResponse.makeResponse(response)
}

export const handler = middleware(main)
