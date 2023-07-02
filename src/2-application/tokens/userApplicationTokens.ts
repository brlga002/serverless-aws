import { DOMAIN_TOKENS } from '1-domain/domainTokens'

export const USER_APPLICATION_TOKENS = {
  ...DOMAIN_TOKENS,
  UsersRepository: Symbol.for('UsersRepository'),
  ListUsersUseCase: Symbol.for('ListUsersUseCase'),
  GetUserUseCase: Symbol.for('GetUserUseCase'),
  UpdateUserUseCase: Symbol.for('UpdateUserUseCase'),
  DeleteUserUseCase: Symbol.for('DeleteUserUseCase'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  AuthUserUseCase: Symbol.for('AuthUserUseCase'),
}
