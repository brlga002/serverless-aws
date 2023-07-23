import { Role } from '0-core/domain/entities/Role'
import { Either } from '0-core/domain/result/Either'

export type InputSign = {
  tenantId: string
  userId: string
  name: string
  role: Role
}

export type OutputSing = {
  token: string
  name: string
}

export interface TokenService {
  sign: (data: InputSign) => Either<Error, OutputSing>
  verify: (token: string) => Either<Error, InputSign>
}
