import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

import './paths'

import { registry } from './registry'
import { SECURITY } from './utils/security'
import { writeFile } from './utils/writeFile'

function run() {
  try {
    console.info('starting file generation...')
    const generator = new OpenApiGeneratorV3(registry.definitions)

    const ts = generator.generateDocument({
      openapi: '3.0.0',
      info: {
        version: '1.0.1',
        title: 'Karhub',
        description: 'Karhub | Desafio Backend.',
      },
      servers: [
        {
          description: 'local',
          url: '{{ API_URL }}',
        },
      ],
      security: SECURITY,
    })

    writeFile('openapi.json', ts, 'src/4-framework/openapi/swagger')
  } catch (error) {
    console.error(error)
  } finally {
    console.info('Finished.')
  }
}

run()
