import { error } from 'console'

import { injectable } from 'inversify'
import { sign as jwtSing } from 'jsonwebtoken'

import { UserAuthToken  } from '0-core/domain/entities/TokenJwt'
import { Either, left, right } from '0-core/domain/result/Either'
import { TokenService, UserTokenJwt } from '1-domain/services/TokenService'

@injectable()
export class JwtTokenService implements TokenService {
  sign(data: { userId: string }): Either<Error, UserTokenJwt> {
    try {
      const token = jwtSing(data, 'secret', { expiresIn: 60 * 60 })
      return right({
        ...data,
        token,
      })
    } catch (error) {}
    return left(error as unknown as Error)
  }

  verify(token: UserAuthToken ): Either<Error, boolean> {
    throw new Error('Not implemented')
  }
}
