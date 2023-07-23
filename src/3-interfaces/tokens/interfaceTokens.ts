import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

export const INTERFACE_TOKENS = {
  ...APPLICATION_TOKENS,
  AuthUserController: Symbol.for('AuthUserController'),
  UpdateUserPasswordController: Symbol.for('UpdateUserPasswordController'),
  UserController: Symbol.for('UserController'),
  TenantController: Symbol.for('TenantController'),
}
