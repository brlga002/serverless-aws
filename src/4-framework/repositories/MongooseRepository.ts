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
    const model = new this._model(entity.toJSON())
    await model.save()
  }

  async delete(id: string): Promise<boolean> {
    await this.connect()
    const result = await this._model.deleteOne({ id })
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
    return this.createClassInstance(result)
  }

  async getById(id: string): Promise<T | null> {
    await this.connect()
    const result = await this._model.findOne({ id })
    if (!result) return null
    return this.createClassInstance(result)
  }

  async list(input: InputListRepository): Promise<OutputListRepository<TDto>> {
    const { offset = 0, limit = 10 } = input ?? {}
    await this.connect()
    const count = await this._model.countDocuments()
    const skip = offset > 0 ? offset * limit : 0
    const result = await this._model.find().skip(skip).limit(limit)

    const data = result.map((record) => {
      const instance = this.deserialize(record)
      return instance
    })

    // Not send instances
    // const instances = result.map((record) => {
    //   const instance = this.createClassInstance(record)
    //   return instance
    // })

    return {
      data,
      total: count,
      offset,
      limit,
    }
  }

  async update(id: string, entity: Entity): Promise<T | null> {
    await this.connect()
    const update = { ...entity.toJSON(), updatedAt: new Date().toISOString() }
    const result = await this._model.findOneAndUpdate({ id }, update, {
      new: true,
    })
    if (!result) return null
    const instance = Activator.instantiateAs<T>(
      this._entityClass,
      this.deserialize(result),
    )
    return instance
  }

  protected createClassInstance(record: any): any {
    const instance = Activator.instantiateAs<T>(
      this._entityClass,
      this.deserialize(record),
    )
    return instance
  }

  protected deserialize(record: any): any {
    const { _id: id, __v, ...rest } = record.toJSON()
    return { id, ...rest }
  }
}
