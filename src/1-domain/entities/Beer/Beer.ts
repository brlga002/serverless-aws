import { z } from 'zod'

import { Entity, EntityDto } from '0-core/domain/entities/Entity'
import { Either, left, right } from '0-core/domain/result/Either'
import { CurrentUser } from '1-domain/auth/CurrentUser'

import { BeerSchema, newBeerSchema, updateBeerSchema } from './Beer.schema'

export type NewBeerDto = z.infer<typeof newBeerSchema>

export type BeerDto = z.infer<typeof BeerSchema>

export type UpdateBeerDto = z.infer<typeof updateBeerSchema>

export class Beer extends Entity<BeerDto> {
  protected constructor(props: NewBeerDto | BeerDto) {
    super(props as BeerDto)
  }

  static async create(
    props: NewBeerDto,
    currentUser: CurrentUser,
  ): Promise<Either<Error, Beer>> {
    const beer = new Beer({
      ...props,
      createdBy: currentUser.userId,
    })

    const calculateAverageTemperature = beer.calculateAverageTemperature()
    if (calculateAverageTemperature.isLeft()) return calculateAverageTemperature

    const result = beer.selfValidateEntity<Beer>(BeerSchema)
    if (result.isLeft()) return left(new Error(result.value.message))
    return right(beer)
  }

  static update(
    entity: BeerDto,
    newData: Partial<BeerDto>,
    currentUser: CurrentUser,
  ): Either<Error, Beer> {
    const beer = new Beer({
      ...entity,
      ...newData,
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser.userId,
    })

    const calculateAverageTemperature = beer.calculateAverageTemperature()
    if (calculateAverageTemperature.isLeft()) return calculateAverageTemperature

    const result = beer.selfValidateEntity<Beer>(BeerSchema)
    if (result.isLeft()) return left(new Error(result.value.message))
    return right(beer)
  }

  calculateAverageTemperature(): Either<Error, Beer> {
    if (this.props.minTemperature > this.props.maxTemperature)
      return left(
        new Error(
          'The minimum temperature cannot be higher than the maximum temperature.',
        ),
      )

    this.props.averageTemperature =
      (this.props.minTemperature + this.props.maxTemperature) / 2

    return right(this)
  }

  exportFields(): Omit<BeerDto, keyof EntityDto> {
    return {
      name: this.props.name,
      minTemperature: this.props.minTemperature,
      maxTemperature: this.props.maxTemperature,
      averageTemperature: this.props.averageTemperature,
    }
  }
}
