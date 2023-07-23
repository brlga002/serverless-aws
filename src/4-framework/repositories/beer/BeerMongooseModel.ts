import mongoose from 'mongoose'

import { BeerDto } from '1-domain/entities/Beer/Beer'

import { createMongooseSchema } from '../createMongooseSchema'

const schema = createMongooseSchema<BeerDto>({
  name: { type: String },
  minTemperature: { type: Number },
  maxTemperature: { type: Number },
  averageTemperature: { type: Number },
})

export const BeerMongooseModel = mongoose.model('Beer', schema, 'Beers')
