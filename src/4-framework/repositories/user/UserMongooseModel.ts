import mongoose from 'mongoose'

import { UserDto } from '1-domain/entities/User/User'

import { createMongooseSchema } from '../createMongooseSchema'

const schema = createMongooseSchema<UserDto>({
  name: { type: String },
  email: { unique: true, type: String },
  password: { type: String },
})

export const UserMongooseModel = mongoose.model('User', schema, 'Users')
