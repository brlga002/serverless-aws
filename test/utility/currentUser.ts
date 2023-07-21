import { Role } from '0-core/domain/entities/Role'
import { CurrentUser } from '1-domain/auth/CurrentUser'

export const CURRENT_USER: CurrentUser = {
  userId: 'valid-user-id',
  tenantId: 'valid-tenant-id',
  role: Role.ADMIN,
}
