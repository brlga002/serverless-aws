import { RouteConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry'
import { z } from 'zod'

import { SECURITY } from './security'

export function deleteEntityPath(props: {
  path: string
  nameModule: string
  security?: RouteConfig['security']
}): RouteConfig {
  return {
    method: 'delete',
    path: props.path,
    summary: `Delete ${props.nameModule}`,
    security: props.security ?? SECURITY,
    tags: [props.nameModule],
    request: {
      params: z.object({ id: z.string() }),
    },

    responses: {
      204: {
        description: `Delete ${props.nameModule}`,
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
