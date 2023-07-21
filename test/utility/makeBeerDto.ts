import { BeerDto, NewBeerDto } from '1-domain/entities/Beer/Beer'

export function makeBeerDto(props: NewBeerDto): BeerDto {
  const result: BeerDto = {
    id: '',
    createdAt: new Date().toISOString(),
    createdBy: '',
    updatedAt: null,
    updatedBy: null,
    averageTemperature: (props.minTemperature + props.maxTemperature) / 2,
    ...props,
  }

  return result
}
