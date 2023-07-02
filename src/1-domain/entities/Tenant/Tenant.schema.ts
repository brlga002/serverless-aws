import { z } from 'zod'

import { entityProps } from '0-core/domain/entities/Entity'

export const tenantTypeSchema = z.enum(['PF', 'PJ'])

const tenantProps = {
  name: z.string().min(3),
  type: tenantTypeSchema,
}

export const newTenantSchema = z.object({
  name: tenantProps.name,
  type: tenantProps.type,
})

export const updateTenantSchema = z.object({
  id: entityProps.id,
  name: tenantProps.name,
})

const { id, ...rest } = entityProps
export const TenantSchema = z.object({ id, ...tenantProps, ...rest })
