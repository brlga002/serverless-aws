import { z } from 'zod'

import { Either, left, right } from '0-core/domain/result/Either'
import { makeId } from '0-core/shared/makeId'

export const entityProps = {
  id: z.string(),
  createdAt: z.string(),
  createdBy: z.string(),
  updatedAt: z.nullable(z.string()),
  updatedBy: z.nullable(z.string()),
}

const entitySchema = z.object({ ...entityProps })

export type EntityDto = z.infer<typeof entitySchema>

export abstract class Entity<T = unknown> {
  private id!: string
  private createdAt!: string
  private createdBy!: string
  private updatedAt!: string | null
  private updatedBy!: string | null
  protected _props!: T & EntityDto

  protected constructor(props: T & EntityDto) {
    this.props = props
    this.id = props.id ?? makeId()
    this.createdAt = props.createdAt ?? new Date().toISOString()
    this.createdBy = props.createdBy
    this.updatedAt = props.updatedAt ?? null
    this.updatedBy = props.updatedBy ?? null
  }

  get props() {
    return this._props
  }

  protected set props(value) {
    this._props = value
  }

  toJSON(hideSensitiveFields = false): T & EntityDto {
    return {
      id: this.id,
      ...this.exportFields(hideSensitiveFields),
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    } as T & EntityDto
  }

  abstract exportFields(hideSensitiveFields: boolean): Omit<T, keyof EntityDto>

  selfValidateEntity<TOutput>(schema: z.ZodType): Either<Error, TOutput> {
    const validateEntity = schema.safeParse(this.toJSON())
    if (!validateEntity.success) return left(validateEntity.error)
    return right(validateEntity.data)
  }
}
