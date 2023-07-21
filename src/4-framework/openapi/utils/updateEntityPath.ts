import { RouteConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry'
import { z } from 'zod'

import { SECURITY } from './security'

export function updateEntityPath(props: {
  path: string
  nameModule: string
  security?: RouteConfig['security']
}): RouteConfig {
  return {
    method: 'put',
    path: props.path,
    summary: `Update a ${props.nameModule}`,
    security: props.security ?? SECURITY,
    tags: [props.nameModule],
    request: {
      params: z.object({ id: z.string() }),
    },

    responses: {
      204: {
        description: `Update a ${props.nameModule}`,
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
