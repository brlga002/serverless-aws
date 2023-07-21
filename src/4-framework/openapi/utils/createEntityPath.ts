import { RouteConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry'

import { SECURITY } from './security'

export function createEntityPath(props: {
  path: string
  nameModule: string
  security?: RouteConfig['security']
}): RouteConfig {
  return {
    method: 'post',
    path: props.path,
    summary: `Create ${props.nameModule}`,
    security: props.security ?? SECURITY,
    tags: [props.nameModule],
    request: {
      body: {
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/New${props.nameModule}`,
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: `Create ${props.nameModule}`,
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
