/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

import {
  InputListRepository,
  OutputListRepository,
  Repository,
} from '0-core/application/repositories/Repository'
import { Entity } from '0-core/domain/entities/Entity'
import { Activator } from '4-framework/utils/Activator'

export abstract class MongooseRepository<T extends Entity, TDto>
  implements Repository<T>
{
  private _uri!: string
  public constructor(
    private readonly _entityClass: any,

    protected readonly _model: mongoose.Model<any>,
  ) {
    this._uri = process.env.MONGO_URI!
  }

  protected async connect() {
    if (!this._model.db.readyState) await mongoose.connect(this._uri)
  }

  async create(entity: Entity): Promise<void> {
    await this.connect()
    const model = new this._model(this.serialize(entity))
    await model.save()
  }

  async delete(id: string): Promise<boolean> {
    await this.connect()
    const result = await this._model.deleteOne({ _id: id })
    return result.acknowledged
  }

  async exists(filter: Record<string, unknown>): Promise<boolean> {
    await this.connect()
    const document = await this._model.exists(filter)
    return !!document
  }

  async findOne(data: Record<string, unknown>): Promise<T | null> {
    await this.connect()
    const result = await this._model.findOne({ data })
    if (!result) return null
    return this.createClassInstance<T>(result)
  }

  async getById(id: string): Promise<T | null> {
    await this.connect()
    const result = await this._model.findById(id)
    if (!result) return null
    return this.createClassInstance<T>(result)
  }

  async list(input: InputListRepository): Promise<OutputListRepository<TDto>> {
    const { offset = 0, limit = 10 } = input ?? {}
    await this.connect()
    const count = await this._model.countDocuments()
    const skip = offset > 0 ? offset * limit : 0
    const result = await this._model.find().skip(skip).limit(limit)

    const data = result.map((record) => {
      const instance = this.createClassInstance<Entity<TDto>>(record)
      return instance.toJSON(true)
    })

    return {
      data,
      total: count,
      offset,
      limit,
    }
  }

  async update(id: string, entity: Entity): Promise<T | null> {
    await this.connect()
    const update = this.serialize(entity)
    const result = await this._model.findOneAndUpdate({ _id: id }, update, {
      new: true,
    })
    if (!result) return null
    const instance = Activator.instantiateAs<T>(
      this._entityClass,
      this.deserialize(result),
    )
    return instance
  }

  protected createClassInstance<T = unknown>(record: any) {
    const instance = Activator.instantiateAs<Entity<T>>(
      this._entityClass,
      this.deserialize(record),
    )
    return instance as T
  }

  protected serialize(record: any): any {
    const { id: _id, ...rest } = record.toJSON()
    return { _id, ...rest }
  }

  protected deserialize(record: any): any {
    const { _id: id, __v, ...rest } = record.toJSON()
    return { id, ...rest }
  }
}
