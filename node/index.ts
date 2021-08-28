// importa contexto e clientes da vtex
import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

// importa clientes externos e a resposta das leads
import { Clients } from './clients'
import { leads } from './middlewares/leads'
import { lead } from './middlewares/lead'

// tempo da requisicao
const TIMEOUT_MS = 7000

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    leads: method({
      GET: [leads],
    }),

    lead: method({
      GET: [lead],
    }),
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
  },
})
