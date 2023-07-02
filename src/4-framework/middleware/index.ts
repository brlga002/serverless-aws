import middyCore from '@middy/core'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import jsonBodyParser from '@middy/http-json-body-parser'

export function middleware(handler: any) {
  return middyCore(handler).use(httpHeaderNormalizer()).use(jsonBodyParser())
}
