import { CreateEntity } from '0-core/interfaces/controllers/CreateEntity'
import { DeleteEntity } from '0-core/interfaces/controllers/DeleteEntity'
import { GetEntity } from '0-core/interfaces/controllers/GetEntity'
import { ListGetEntities } from '0-core/interfaces/controllers/ListGetEntities'
import { UpdateEntity } from '0-core/interfaces/controllers/UpdateEntity'
import { BeerDto, NewBeerDto, UpdateBeerDto } from '1-domain/entities/Beer/Beer'

export interface BeerRoutesController
  extends CreateEntity<NewBeerDto>,
    ListGetEntities<BeerDto>,
    GetEntity<BeerDto>,
    UpdateEntity<UpdateBeerDto>,
    DeleteEntity {}
