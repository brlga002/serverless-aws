import middyCore from '@middy/core'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import jsonBodyParser from '@middy/http-json-body-parser'

import { authCurrentUser } from './authCurrentUser'

export function middleware(handler: any) {
  return middyCore(handler)
    .use(httpHeaderNormalizer())
    .use(jsonBodyParser())
    .use(authCurrentUser())
}
