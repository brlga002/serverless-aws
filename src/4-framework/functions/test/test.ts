import 'reflect-metadata'
import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { Role } from '0-core/domain/entities/Role'
import { UserEntity } from '1-domain/entities/User/User'
import { middleware } from '4-framework/middleware'
import { JwtTokenService } from '4-framework/services/JwtTokenService'

export async function main(event: APIGatewayProxyEventV2) {
  const result = UserEntity.create(event.body as any)

  if (result.isRight()) {
    console.log(await result.value.setHashPassword('123456'))
  }

  const response = new JwtTokenService()

  const teste = response.sign({
    role: Role.ADMIN,
    tenantId: 'nGNmgQtLlBt8UHABiqw-z',
    userId: 'nGNmgQtLlBt8UHABiqw-y',
    name: 'gabriel',
  })

  return {
    statusCode: 200,
    body: JSON.stringify(teste.value),
  }
}

export const handler = middleware(main)
