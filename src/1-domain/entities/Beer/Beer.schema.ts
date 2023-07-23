import { z } from 'zod'

import { entityProps } from '0-core/domain/entities/Entity'

export const beerProps = {
  name: z.string().min(3),
  minTemperature: z.number(),
  maxTemperature: z.number(),
  averageTemperature: z.number(),
}

export const newBeerSchema = z.object({
  name: beerProps.name,
  minTemperature: beerProps.minTemperature,
  maxTemperature: beerProps.maxTemperature,
})

export const updateBeerSchema = z.object({
  id: entityProps.id,
  name: z.optional(beerProps.name),
  minTemperature: z.optional(beerProps.minTemperature),
  maxTemperature: z.optional(beerProps.maxTemperature),
})

const { id, ...rest } = entityProps
export const BeerSchema = z.object({ id, ...beerProps, ...rest })
