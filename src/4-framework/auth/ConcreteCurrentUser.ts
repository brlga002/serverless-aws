import { injectable } from 'inversify'

import { Role } from '0-core/domain/entities/Role'
import { CurrentUser } from '1-domain/auth/CurrentUser'

@injectable()
export class ConcreteCurrentUser implements CurrentUser {
  constructor(
    readonly userId: string,
    readonly tenantId: string,
    public role: Role,
  ) {}
}
