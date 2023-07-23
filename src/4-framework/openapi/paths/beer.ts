import { z } from 'zod'

import { BeerSchema, newBeerSchema } from '1-domain/entities/Beer/Beer.schema'
import { findBeerStyleAndPlaylistSchema } from '3-interfaces/validators/ValidateBeerRequest'

import { registry } from '../registry'
import { createEntityPath } from '../utils/createEntityPath'
import { deleteEntityPath } from '../utils/deleteEntityPath'
import { getEntityPath } from '../utils/getEntityPath'
import { listEntitiesPath } from '../utils/listEntitiesPath'
import { updateEntityPath } from '../utils/updateEntityPath'

registry.registerPath(createEntityPath({ path: '/beers', nameModule: 'Beer' }))
registry.registerPath(createEntityPath({ path: '/beers', nameModule: 'Beer' }))
registry.registerPath(
  deleteEntityPath({ path: '/beers/{id}', nameModule: 'Beer' }),
)
registry.registerPath(
  getEntityPath({ path: '/beers/{id}', nameModule: 'Beer' }),
)
registry.registerPath(listEntitiesPath({ path: '/beers', nameModule: 'Beer' }))
registry.registerPath(
  updateEntityPath({ path: '/beers/{id}', nameModule: 'Beer' }),
)
registry.register('Beer', BeerSchema.openapi('Beer'))
registry.register('NewBeer', newBeerSchema.openapi('NewBeer'))

registry.registerPath({
  method: 'post',
  path: '/beers/beer-style',
  summary: `Get Beer style`,
  security: [],
  tags: ['Beer and Playlist'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: findBeerStyleAndPlaylistSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: `Get Beer style`,
      content: {
        'application/json': {
          schema: z.object({
            beerStyle: z.string().openapi({ example: 'IPA' }),
            playlist: z.object({
              name: z.string().openapi({ example: 'IPARTY' }),
              tracks: z.array(
                z.object({
                  name: z.string().openapi({ example: 'Lua de Cristal' }),
                  artist: z.string().openapi({ example: 'Xuxa' }),
                  link: z.string().openapi({
                    example:
                      'https: //open.spotify.com/artist/21451j1KhjAiaYKflxBjr1',
                  }),
                }),
              ),
            }),
          }),
        },
      },
    },
  },
})
