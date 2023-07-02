import { UserAuthToken } from '0-core/domain/entities/TokenJwt'
import { Either } from '0-core/domain/result/Either'

export interface UserTokenJwt {
  token: string
  userId: string
}

export interface TokenService {
  sign: (data: { userId: string }) => Either<Error, UserTokenJwt>
  verify: (token: UserAuthToken) => Either<Error, boolean>
}
