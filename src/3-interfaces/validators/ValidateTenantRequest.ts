import { z } from 'zod'

import { entityProps } from '0-core/domain/entities/Entity'
import { NewTenantDto } from '1-domain/entities/Tenant/Tenant'
import {
  newTenantSchema,
  tenantProps,
} from '1-domain/entities/Tenant/Tenant.schema'

import {
  getEntitySchema,
  GetEntitySchema,
  listEntitiesSchema,
  ListEntitiesSchema,
} from './entitySchemas'
import { validateInputWithSchema } from './validateInputWithSchema'

const updateTenantSchema = z.object({
  id: entityProps.id,
  name: tenantProps.name,
})

type UpdateTenantSchema = z.infer<typeof updateTenantSchema>

export class ValidateTenantRequest {
  static createTenant(input?: unknown) {
    return validateInputWithSchema<NewTenantDto>(newTenantSchema, input)
  }

  static getTenant(input?: unknown) {
    return validateInputWithSchema<GetEntitySchema>(getEntitySchema, input)
  }

  static listTenant(input?: unknown) {
    return validateInputWithSchema<ListEntitiesSchema>(
      listEntitiesSchema,
      input,
    )
  }

  static updateTenant(input?: unknown) {
    return validateInputWithSchema<UpdateTenantSchema>(
      updateTenantSchema,
      input,
    )
  }

  static deleteTenant(input?: unknown) {
    return validateInputWithSchema<GetEntitySchema>(getEntitySchema, input)
  }
}
