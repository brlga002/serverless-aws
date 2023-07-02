import { z } from 'zod'

import { NewUserDto } from '1-domain/entities/User/User'

import { ValidateInput } from './ValidateInput'

const sharedProps = {
  id: z.string(),
  name: z.string().min(3),
  email: z.string().email(),
}

const schemas = {
  create: z.object({
    name: sharedProps.name,
    email: sharedProps.email,
    password: z.string(),
  }),
  list: z.object({
    q: z.optional(z.string()),
    sort: z.optional(z.string()),
    fields: z.optional(z.array(z.string()).min(1)),
    offset: z.number().nonnegative().default(0),
    limit: z.number().nonnegative().optional().default(10),
  }),
  get: z.object({
    id: sharedProps.id,
  }),
  update: z.object({
    id: sharedProps.id,
    entity: z.object({
      name: sharedProps.name,
    }),
  }),
  delete: z.object({
    id: sharedProps.id,
  }),
}

export type OutputCreateValidation = z.infer<typeof schemas.create>

export type OutputGetValidation = z.infer<typeof schemas.get>

export type OutputListValidation = z.infer<typeof schemas.list>

export type OutputUpdateValidation = z.infer<typeof schemas.update>

export type OutputDeleteValidation = z.infer<typeof schemas.delete>

export class ValidateRequestParameters {
  static createRoute(input: Partial<NewUserDto>) {
    return new ValidateInput<OutputCreateValidation>(schemas.create).validate(
      input,
    )
  }

  static listRoute(input: Partial<OutputListValidation>) {
    return new ValidateInput<OutputListValidation>(schemas.list).validate(input)
  }

  static getRoute(input: Partial<OutputGetValidation>) {
    return new ValidateInput<OutputGetValidation>(schemas.get).validate(input)
  }

  static updateRoute(input: Partial<OutputUpdateValidation>) {
    return new ValidateInput<OutputUpdateValidation>(schemas.update).validate(
      input,
    )
  }

  static deleteRoute(input: Partial<OutputDeleteValidation>) {
    return new ValidateInput<OutputDeleteValidation>(schemas.delete).validate(
      input,
    )
  }
}
