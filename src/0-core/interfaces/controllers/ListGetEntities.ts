import {
  InputListUseCase,
  OutputListUseCase,
} from '0-core/application/useCases/ListUseCase'

export type ListGetEntities<TEntity> = {
  listEntities(input: InputListUseCase): OutputListUseCase<TEntity>
}
