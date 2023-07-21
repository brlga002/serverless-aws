import { z } from 'zod'

import { authUserSchema } from '3-interfaces/validators/ValidateUserRequest'

import { registry } from '../registry'
import { createEntityPath } from '../utils/createEntityPath'

registry.registerPath({
  ...createEntityPath({ path: '/users', nameModule: 'User' }),
  security: [],
  tags: ['Auth', 'User'],
  summary: `Create User`,
})

registry.registerPath({
  method: 'post',
  path: '/authenticate/login',
  summary: `Authenticate User`,
  security: [],
  tags: ['Auth'],
  request: {
    body: {
      description: `Usuario <b>gabriel@gmail.com</b> e senha <b>123456</b> válidos no ambiente de teste. </br></br> Envie para receber um token.`,
      content: {
        'application/json': {
          schema: authUserSchema.openapi({
            default: { email: 'gabriel@gmail.com', password: '123456' },
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: `Authenticate User`,
      content: {
        'application/json': {
          schema: z.object({
            token: z.string(),
            name: z.string(),
          }),
        },
      },
    },
  },
})
