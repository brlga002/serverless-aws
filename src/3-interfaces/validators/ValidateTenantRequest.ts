import { z } from 'zod'

import { entityProps } from '0-core/domain/entities/Entity'
import { NewTenantDto } from '1-domain/entities/Tenant/Tenant'
import {
  newTenantSchema,
  tenantProps,
} from '1-domain/entities/Tenant/Tenant.schema'

import { validateInputWithSchema } from './validateInputWithSchema'
import { ValidateRequest } from './ValidateRequest'

const updateTenantSchema = z.object({
  id: entityProps.id,
  name: tenantProps.name,
})

type UpdateTenantSchema = z.infer<typeof updateTenantSchema>

export class ValidateTenantRequest extends ValidateRequest {
  static createEntity(input?: unknown) {
    return validateInputWithSchema<NewTenantDto>(newTenantSchema, input)
  }

  static updateEntity(input?: unknown) {
    return validateInputWithSchema<UpdateTenantSchema>(
      updateTenantSchema,
      input,
    )
  }
}
