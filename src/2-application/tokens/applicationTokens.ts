import { DOMAIN_TOKENS } from '1-domain/domainTokens'

const AUTH_TOKENS = {
  AuthUserUseCase: Symbol.for('AuthUserUseCase'),
}

const USERS_TOKENS = {
  UsersRepository: Symbol.for('UsersRepository'),
  ListUsersUseCase: Symbol.for('ListUsersUseCase'),
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  UpdateUserUseCase: Symbol.for('UpdateUserUseCase'),
  DeleteUserUseCase: Symbol.for('DeleteUserUseCase'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
}

const TENANTS_TOKENS = {
  TenantsRepository: Symbol.for('TenantsRepository'),
  ListTenantsUseCase: Symbol.for('ListTenantsUseCase'),
  GetTenantUseCase: Symbol.for('GetTenantUseCase'),
  UpdateTenantUseCase: Symbol.for('UpdateTenantUseCase'),
  DeleteTenantUseCase: Symbol.for('DeleteTenantUseCase'),
  CreateTenantUseCase: Symbol.for('CreateTenantUseCase'),
}

export const APPLICATION_TOKENS = {
  ...DOMAIN_TOKENS,
  ...AUTH_TOKENS,
  ...USERS_TOKENS,
  ...TENANTS_TOKENS,
}
