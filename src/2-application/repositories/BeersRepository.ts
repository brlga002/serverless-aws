import { Repository } from '0-core/application/repositories/Repository'
import { Beer, BeerDto } from '1-domain/entities/Beer/Beer'

export interface BeersRepository extends Repository<Beer, BeerDto> {
  findBeersByTemperatureRangeSortedByName(
    temperature: number,
  ): Promise<BeerDto[]>
}
