import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { sign } from 'jsonwebtoken'

import { UserEntity } from '1-domain/entities/User/User'
import { middleware } from '4-framework/middleware'

export async function main(event: APIGatewayProxyEventV2) {
  const result = UserEntity.create(event.body as any)

  if (result.isRight()) {
    console.log(await result.value.setHashPassword('123456'))
  }

  const teste = sign(
    {
      // data: 'foobar',
    },
    'secret',
    { expiresIn: 60 * 60 },
  )

  return {
    statusCode: 200,
    body: JSON.stringify(teste),
  }
}

export const handler = middleware(main)
