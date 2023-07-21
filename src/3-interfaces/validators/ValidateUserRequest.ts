import { z } from 'zod'

import { entityProps } from '0-core/domain/entities/Entity'
import { NewUserDto, UpdateUserDto } from '1-domain/entities/User/User'
import {
  newUserSchema,
  updateUserSchema,
  userProps,
} from '1-domain/entities/User/User.schema'

import { validateInputWithSchema } from './validateInputWithSchema'
import { ValidateRequest } from './ValidateRequest'

const updateUserPasswordSchema = z.object({
  id: entityProps.id,
  newPassword: userProps.password,
  oldPassword: userProps.password,
})

export const authUserSchema = z.object({
  email: userProps.email,
  password: userProps.password,
})

type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>

type AuthUserSchema = z.infer<typeof authUserSchema>

export class ValidateUserRequest extends ValidateRequest {
  static createEntity(input?: unknown) {
    return validateInputWithSchema<NewUserDto>(newUserSchema, input)
  }

  static updateEntity(input?: unknown) {
    return validateInputWithSchema<UpdateUserDto>(updateUserSchema, input)
  }

  static updateUserPassword(input?: unknown) {
    return validateInputWithSchema<UpdateUserPasswordSchema>(
      updateUserPasswordSchema,
      input,
    )
  }

  static authUser(input?: unknown) {
    return validateInputWithSchema<AuthUserSchema>(authUserSchema, input)
  }
}
