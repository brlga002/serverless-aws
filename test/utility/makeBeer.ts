import { faker } from '@faker-js/faker'

import { Beer, NewBeerDto } from '1-domain/entities/Beer/Beer'

import { CURRENT_USER } from './currentUser'

export const INPUT_CREATE_BEER = {
  name: 'Beer Name',
  minTemperature: -2,
  maxTemperature: 2,
}

export async function makeBeer(props?: Record<string, unknown>): Promise<Beer> {
  const result = await Beer.create(
    {
      ...INPUT_CREATE_BEER,
      name: faker.internet.userName(),
      ...props,
    } as NewBeerDto,
    CURRENT_USER,
  )

  if (result.isLeft()) throw new Error('Failed to create user')

  return result.value as Beer
}
