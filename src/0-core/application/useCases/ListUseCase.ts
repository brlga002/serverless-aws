import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'

import { BaseUseCase } from './BaseUseCase'
import { ApplicationError } from '../result/ApplicationError'

export type ListResult<T> = {
  data: T[]
  offset: number
  limit: number
  total: number
}

export type OutputListUseCase<T> = Promise<
  Either<ApplicationError, ApplicationResult<ListResult<T>>>
>

export type InputListUseCase = {
  // default query parameter (e.g. used by browser tab completion); should have an entity specific alias, like sku
  q?: string
  // comma-separated list of fields to define the sort order. To indicate sorting direction, fields may be prefixed with + (ascending) or - (descending), e.g. /sales-orders?sort=+id
  sort?: string
  // to retrieve only a subset of fields of a resource.
  fields?: string[]
  // numeric offset of the first element on a page. See pagination section.
  offset?: number
  // client suggested limit to restrict the number of entries on a page. See pagination section.
  limit?: number
}

export type ListUseCase<T> = BaseUseCase<InputListUseCase, OutputListUseCase<T>>
