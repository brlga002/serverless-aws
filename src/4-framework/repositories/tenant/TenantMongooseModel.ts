import mongoose from 'mongoose'

import { TenantDto } from '1-domain/entities/Tenant/Tenant'

import { createMongooseSchema } from '../createMongooseSchema'

const schema = createMongooseSchema<TenantDto>({
  name: { type: String },
  type: { type: String },
  email: { type: String },
})

export const TenantMongooseModel = mongoose.model('Tenant', schema, 'Tenants')
