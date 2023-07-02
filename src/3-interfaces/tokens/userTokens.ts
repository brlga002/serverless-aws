import { USER_APPLICATION_TOKENS } from '2-application/tokens/userApplicationTokens'

export const USER_TOKENS = {
  ...USER_APPLICATION_TOKENS,
  AuthUserController: Symbol.for('AuthUserController'),
  UserController: Symbol.for('UserController'),
}
