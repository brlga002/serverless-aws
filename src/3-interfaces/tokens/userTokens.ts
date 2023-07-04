import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

export const USER_TOKENS = {
  ...APPLICATION_TOKENS,
  AuthUserController: Symbol.for('AuthUserController'),
  UserController: Symbol.for('UserController'),
}
