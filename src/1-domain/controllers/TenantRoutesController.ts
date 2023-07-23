import { CreateEntity } from '0-core/interfaces/controllers/CreateEntity'
import { DeleteEntity } from '0-core/interfaces/controllers/DeleteEntity'
import { GetEntity } from '0-core/interfaces/controllers/GetEntity'
import { ListGetEntities } from '0-core/interfaces/controllers/ListGetEntities'
import { UpdateEntity } from '0-core/interfaces/controllers/UpdateEntity'
import {
  NewTenantDto,
  TenantDto,
  UpdateTenantDto,
} from '1-domain/entities/Tenant/Tenant'

export interface TenantRoutesController
  extends CreateEntity<NewTenantDto>,
    ListGetEntities<TenantDto>,
    GetEntity<TenantDto>,
    UpdateEntity<UpdateTenantDto>,
    DeleteEntity {}
