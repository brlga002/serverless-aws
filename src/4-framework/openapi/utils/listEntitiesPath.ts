import { RouteConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry'
import { z } from 'zod'

import { listEntitiesSchema } from '3-interfaces/validators/ValidateRequest'

import { SECURITY } from './security'

export function listEntitiesPath(props: {
  path: string
  nameModule: string
  security?: RouteConfig['security']
}): RouteConfig {
  return {
    method: 'get',
    path: props.path,
    summary: `List ${props.nameModule}s`,
    security: props.security ?? SECURITY,
    tags: [props.nameModule],
    request: {
      query: z.object({
        offset: z.optional(z.coerce.number().nonnegative()),
        limit: z.optional(z.coerce.number().nonnegative()),
      }),
    },

    responses: {
      200: {
        description: `List ${props.nameModule}s`,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    $ref: `#/components/schemas/${props.nameModule}`,
                  },
                },
                total: {
                  type: 'number',
                },
                offset: {
                  type: 'number',
                },
                limit: {
                  type: 'number',
                },
              },
              required: ['data', 'total', 'offset', 'limit'],
            },
          },
        },
      },
    },
  }
}
