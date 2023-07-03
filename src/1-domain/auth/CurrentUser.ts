import { Role } from '0-core/domain/entities/Role'

export interface CurrentUser {
  userId: string
  tenantId: string
  role: Role
}
