import { Beer, BeerDto } from '1-domain/entities/Beer/Beer'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { BeerMongooseModel } from '4-framework/repositories/beer/BeerMongooseModel'

import { MongooseRepository } from '../MongooseRepository'

export class BeerMongooseRepository
  extends MongooseRepository<Beer, BeerDto>
  implements BeersRepository
{
  constructor() {
    super(Beer, BeerMongooseModel)
  }

  async findBeersByTemperatureRangeSortedByName(
    temperature: number,
  ): Promise<BeerDto[]> {
    await this.connect()

    const result = await this._model
      .find({
        minTemperature: { $lte: temperature },
        maxTemperature: { $gte: temperature },
      })
      .sort({ name: 1 })

    const data = result.map((record) => this.deserialize(record))

    return data
  }
}
