import { Schema, SchemaTypeOptions } from 'mongoose'

import { EntityDto } from '0-core/domain/entities/Entity'

export function createMongooseSchema<TEntitySchema>(
  fields: Record<
    keyof Omit<TEntitySchema, keyof EntityDto>,
    SchemaTypeOptions<any>
  >,
): Schema {
  return new Schema({
    id: { type: String },
    createdAt: { type: String },
    updatedAt: { type: String },
    ...fields,
  })
}
