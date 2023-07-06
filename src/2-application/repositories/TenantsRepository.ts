import { Repository } from '0-core/application/repositories/Repository'
import { Tenant, TenantDto } from '1-domain/entities/Tenant/Tenant'

export type TenantsRepository = Repository<Tenant, TenantDto>
