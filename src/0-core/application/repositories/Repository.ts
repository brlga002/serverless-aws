import { Entity } from '0-core/domain/entities/Entity'

export type InputListRepository = {
  offset?: number
  limit?: number
}

export type OutputListRepository<T> = {
  data: T[]
  offset: number
  limit: number
  total: number
}

export interface Repository<T extends Entity, TDto = any> {
  create: (entity: T) => Promise<void>
  list: (input: InputListRepository) => Promise<OutputListRepository<TDto>>
  getById: (id: string) => Promise<T | null>
  update: (id: string, entity: Entity) => Promise<T | null>
  delete: (id: string) => Promise<boolean>
  exists: (filter: Record<string, unknown>) => Promise<boolean>
}
