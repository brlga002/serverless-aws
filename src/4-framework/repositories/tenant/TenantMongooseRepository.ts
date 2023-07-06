import { Tenant, TenantDto } from '1-domain/entities/Tenant/Tenant'
import { TenantsRepository } from '2-application/repositories/TenantsRepository'

import { TenantMongooseModel } from './TenantMongooseModel'
import { MongooseRepository } from '../MongooseRepository'

export class TenantMongooseRepository
  extends MongooseRepository<Tenant, TenantDto>
  implements TenantsRepository
{
  constructor() {
    super(Tenant, TenantMongooseModel)
  }
}
