import { z } from 'zod'

export const getEntitySchema = z.object({
  id: z.string(),
})

export const listEntitiesSchema = z.nullable(
  z.object({
    offset: z.coerce.number().nonnegative().default(0),
    limit: z.coerce.number().nonnegative().min(1).default(10),
  }),
)

export type GetEntitySchema = z.infer<typeof getEntitySchema>

export type ListEntitiesSchema = z.infer<typeof listEntitiesSchema>
