import { RouteConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry'
import { z } from 'zod'

import { SECURITY } from './security'

export function getEntityPath(props: {
  path: string
  nameModule: string
  security?: RouteConfig['security']
}): RouteConfig {
  return {
    method: 'get',
    path: props.path,
    summary: `Get ${props.nameModule}`,
    security: props.security ?? SECURITY,
    tags: [props.nameModule],
    request: {
      params: z.object({ id: z.string() }),
    },

    responses: {
      204: {
        description: `Get ${props.nameModule}`,
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/${props.nameModule}`,
            },
          },
        },
      },
    },
  }
}
