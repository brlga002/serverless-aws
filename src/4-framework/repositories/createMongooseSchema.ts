import { Schema, SchemaTypeOptions } from 'mongoose'

import { EntityDto } from '0-core/domain/entities/Entity'

export function createMongooseSchema<TEntitySchema>(
  fields: Record<
    keyof Omit<TEntitySchema, keyof EntityDto>,
    SchemaTypeOptions<any>
  >,
): Schema {
  return new Schema({
    id: { type: Schema.Types.ObjectId },
    createdAt: { type: String },
    createdBy: { type: Schema.Types.ObjectId },
    updatedAt: { type: String },
    updatedBy: { type: Schema.Types.ObjectId },
    ...fields,
  })
}
