import { newUserSchema, UserSchema } from '1-domain/entities/User/User.schema'

import { registry } from '../registry'
import { deleteEntityPath } from '../utils/deleteEntityPath'
import { getEntityPath } from '../utils/getEntityPath'
import { listEntitiesPath } from '../utils/listEntitiesPath'
import { updateEntityPath } from '../utils/updateEntityPath'

registry.registerPath(
  deleteEntityPath({ path: '/users/{id}', nameModule: 'User' }),
)
registry.registerPath(
  getEntityPath({ path: '/users/{id}', nameModule: 'User' }),
)
registry.registerPath(listEntitiesPath({ path: '/users', nameModule: 'User' }))
registry.registerPath(
  updateEntityPath({ path: '/users/{id}', nameModule: 'User' }),
)
registry.register('User', UserSchema.openapi('User'))
registry.register('NewUser', newUserSchema.openapi('NewUser'))
