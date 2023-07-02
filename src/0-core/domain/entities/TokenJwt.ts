import { Role } from './Role'

export interface UserAuthToken {
  iat: number
  exp: number
  tenantId: number
  userId: number
  roles: Role[]
}
