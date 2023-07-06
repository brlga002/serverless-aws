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

export interface Repository<T extends Entity, TDto = unknown> {
  create(entity: T): Promise<void>
  delete(id: string): Promise<boolean>
  exists(filter: Record<string, unknown>): Promise<boolean>
  findOne(data: Record<string, unknown>): Promise<T | null>
  getById(id: string): Promise<T | null>
  list(input: InputListRepository): Promise<OutputListRepository<TDto>>
  update(id: string, entity: Entity): Promise<T | null>
}
