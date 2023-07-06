import { z } from 'zod'

import { NewUserDto } from '1-domain/entities/User/User'
import { newUserSchema } from '1-domain/entities/User/User.schema'

import { validateInputWithSchema } from './validateInputWithSchema'
import { ValidateRequest } from './ValidateRequest'

const addressSchema = z.object({
  zipCode: z.string(),
  street: z.string(),
  complement: z.string(),
  city: z.string(),
  state: z.enum(['AM']),
})

const sharedProps = {
  id: z.string(),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.coerce
    .string()
    .min(4, 'A senha deve ter pelo menos 4 caracteres'),
  address: addressSchema,
}

const updateUserSchema = z.object({
  id: sharedProps.id,
  name: sharedProps.name,
})

const updateUserPasswordSchema = z.object({
  id: sharedProps.id,
  newPassword: sharedProps.password,
  oldPassword: sharedProps.password,
})

const authUserSchema = z.object({
  email: sharedProps.email,
  password: sharedProps.password,
})

type UpdateUserSchema = z.infer<typeof updateUserSchema>

type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>

type AuthUserSchema = z.infer<typeof authUserSchema>

export class ValidateUserRequest extends ValidateRequest {
  static createEntity(input?: unknown) {
    return validateInputWithSchema<NewUserDto>(newUserSchema, input)
  }

  static updateEntity(input?: unknown) {
    return validateInputWithSchema<UpdateUserSchema>(updateUserSchema, input)
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
