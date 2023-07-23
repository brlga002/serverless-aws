import 'reflect-metadata'

import { CreateBeerUseCase } from '2-application/useCases/beer/CreateBeerUseCase'
import { DeleteBeerUseCase } from '2-application/useCases/beer/DeleteBeerUseCase'
import { FindBeerStyleAndPlaylistUseCase } from '2-application/useCases/beer/FindBeerStyleAndPlaylistUseCase'
import { GetBeerUseCase } from '2-application/useCases/beer/GetBeerUseCase'
import { ListBeersUseCase } from '2-application/useCases/beer/ListBeersUseCase'
import { UpdateBeerUseCase } from '2-application/useCases/beer/UpdateBeerUseCase'
import { BeerController } from '3-interfaces/controllers/BeerController'
import { BeerStyleAndPlaylistController } from '3-interfaces/controllers/BeerStyleAndPlaylistController'
import { BeerMongooseRepository } from '4-framework/repositories/beer/BeerMongooseRepository'
import { SpotifyPlaylistService } from '4-framework/services/SpotifyPlaylistService'
import { INTERFACE_TOKENS } from 'src/3-interfaces/tokens/interfaceTokens'

import { container } from '../container'

container
  .bind(INTERFACE_TOKENS.BeersRepository)
  .toConstantValue(new BeerMongooseRepository())
container.bind(INTERFACE_TOKENS.GetBeerUseCase).to(GetBeerUseCase)
container.bind(INTERFACE_TOKENS.ListBeersUseCase).to(ListBeersUseCase)
container.bind(INTERFACE_TOKENS.UpdateBeerUseCase).to(UpdateBeerUseCase)
container.bind(INTERFACE_TOKENS.DeleteBeerUseCase).to(DeleteBeerUseCase)
container.bind(INTERFACE_TOKENS.CreateBeerUseCase).to(CreateBeerUseCase)
container
  .bind(INTERFACE_TOKENS.FindBeerStyleAndPlaylistUseCase)
  .to(FindBeerStyleAndPlaylistUseCase)
container.bind(INTERFACE_TOKENS.BeerController).to(BeerController)
container
  .bind(INTERFACE_TOKENS.BeerStyleAndPlaylistController)
  .to(BeerStyleAndPlaylistController)
container.bind(INTERFACE_TOKENS.PlaylistService).to(SpotifyPlaylistService)
