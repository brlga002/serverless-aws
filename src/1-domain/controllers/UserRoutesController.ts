import { CreateEntity } from '0-core/interfaces/controllers/CreateEntity'
import { DeleteEntity } from '0-core/interfaces/controllers/DeleteEntity'
import { GetEntity } from '0-core/interfaces/controllers/GetEntity'
import { ListGetEntities } from '0-core/interfaces/controllers/ListGetEntities'
import { UpdateEntity } from '0-core/interfaces/controllers/UpdateEntity'
import { NewUserDto, UpdateUserDto, UserDto } from '1-domain/entities/User/User'

export interface UserRoutesController
  extends CreateEntity<NewUserDto>,
    ListGetEntities<UserDto>,
    GetEntity<UserDto>,
    UpdateEntity<UpdateUserDto>,
    DeleteEntity {}
