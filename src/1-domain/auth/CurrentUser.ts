import { Role } from '0-core/domain/entities/Role'

export interface CurrentUser {
  readonly userId: string
  readonly tenantId: string
  role: Role
}
