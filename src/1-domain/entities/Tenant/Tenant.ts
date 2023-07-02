import { z } from 'zod'

import { Entity } from '0-core/domain/entities/Entity'
import { Either, left, right } from '0-core/domain/result/Either'

import {
  newTenantSchema,
  TenantSchema,
  updateTenantSchema,
} from './Tenant.schema'

export type NewTenantDto = z.infer<typeof newTenantSchema>

export type TenantDto = z.infer<typeof TenantSchema>

export type UpdateTenantDto = z.infer<typeof updateTenantSchema>

export class Tenant extends Entity<TenantDto> {
  protected constructor(props: NewTenantDto | TenantDto) {
    super(props as TenantDto)
  }

  static create(props: NewTenantDto): Either<Error, Tenant> {
    const tenant = new Tenant({
      ...props,
      createdBy: 'to do',
    })

    const result = tenant.selfValidateEntity<Tenant>(TenantSchema)
    if (result.isLeft()) return left(new Error(result.value.message))
    return right(tenant)
  }
}
