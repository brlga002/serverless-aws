import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

export const INTERFACE_TOKENS = {
  ...APPLICATION_TOKENS,
  AuthUserController: Symbol.for('AuthUserController'),
  UserController: Symbol.for('UserController'),
  TenantController: Symbol.for('TenantController'),
}
