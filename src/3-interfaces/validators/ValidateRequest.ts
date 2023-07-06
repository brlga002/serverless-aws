import { z } from 'zod'

import { validateInputWithSchema } from './validateInputWithSchema'

export const getEntitySchema = z.object({
  id: z.string(),
})

export const listEntitiesSchema = z
  .object({
    offset: z.coerce.number().nonnegative().default(0),
    limit: z.coerce.number().nonnegative().min(1).default(10),
  })
  .default({
    offset: 0,
    limit: 10,
  })

export type GetEntitySchema = z.infer<typeof getEntitySchema>

export type ListEntitiesSchema = z.infer<typeof listEntitiesSchema>

export abstract class ValidateRequest {
  static deleteEntity(input?: unknown) {
    return validateInputWithSchema<GetEntitySchema>(getEntitySchema, input)
  }

  static getEntity(input?: unknown) {
    return validateInputWithSchema<GetEntitySchema>(getEntitySchema, input)
  }

  static listEntities(input?: unknown) {
    return validateInputWithSchema<ListEntitiesSchema>(
      listEntitiesSchema,
      input,
    )
  }
}
