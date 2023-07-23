import { z } from 'zod'

import { tenantTypeSchema } from './Tenant.schema'

export type TenantType = z.infer<typeof tenantTypeSchema>
