import { RouteConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry'

export const SECURITY: RouteConfig['security'] = [{ bearerAuth: [] }]
