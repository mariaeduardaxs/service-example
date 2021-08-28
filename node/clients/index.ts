// importa os clients da VTEX IO
import { IOClients } from '@vtex/api'

// importa os leads da aws
import Leads from './leads'

// exporta os leads da aws (get) e publica dentro do IO
export class Clients extends IOClients {
  public get leads() {
    return this.getOrSet('leads', Leads)
  }
}
