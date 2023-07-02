import 'dotenv/config'
import { Container } from 'inversify'

export const container = new Container({ defaultScope: 'Singleton' })
