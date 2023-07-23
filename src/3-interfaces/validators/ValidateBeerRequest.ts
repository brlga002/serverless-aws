import { z } from 'zod'

import { NewBeerDto, UpdateBeerDto } from '1-domain/entities/Beer/Beer'
import {
  newBeerSchema,
  updateBeerSchema,
} from '1-domain/entities/Beer/Beer.schema'

import { validateInputWithSchema } from './validateInputWithSchema'
import { ValidateRequest } from './ValidateRequest'

export const findBeerStyleAndPlaylistSchema = z.object({
  temperature: z.number(),
})

export type FindBeerStyleAndPlaylistDto = z.infer<
  typeof findBeerStyleAndPlaylistSchema
>

export class ValidateBeerRequest extends ValidateRequest {
  static createEntity(input?: unknown) {
    return validateInputWithSchema<NewBeerDto>(newBeerSchema, input)
  }

  static updateEntity(input?: unknown) {
    return validateInputWithSchema<UpdateBeerDto>(updateBeerSchema, input)
  }

  static findBeerStyleAndPlaylist(input?: unknown) {
    return validateInputWithSchema<FindBeerStyleAndPlaylistDto>(
      findBeerStyleAndPlaylistSchema,
      input,
    )
  }
}
