import { error } from 'console'

import { injectable } from 'inversify'
import { sign as jwtSing, verify as jwtVerify } from 'jsonwebtoken'

import { Either, left, right } from '0-core/domain/result/Either'
import {
  InputSign,
  OutputSing,
  TokenService,
} from '1-domain/services/TokenService'

@injectable()
export class JwtTokenService implements TokenService {
  protected secret = String(process.env.JWT_APPLICATION_KEY)

  sign(data: InputSign): Either<Error, OutputSing> {
    try {
      const token = jwtSing(data, this.secret, { expiresIn: '2h' })
      return right({ token, name: data.name })
    } catch (error) {}
    return left(error as unknown as Error)
  }

  verify(token: string): Either<Error, InputSign> {
    try {
      const decoded = jwtVerify(token, this.secret)
      return right(decoded as InputSign)
    } catch (err) {
      return left(err as unknown as Error)
    }
  }
}
