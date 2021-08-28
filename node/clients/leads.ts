// importa instancias do VTEX IO
// importa cliente externo - api VTEX

import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

// cria cliente para os leads que vem da aws

// cria construtor com a url da api externa

export default class Leads extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://i6328uam31.execute-api.us-east-2.amazonaws.com/prod',
      context,
      options
    )
  }

  // cria funcao para fazer o get de todos os  leads

  public async getLeads(leads: string): Promise<string> {
    return this.http.get(leads, {
      metric: 'leads-get',
    })
  }

  // cria funcao para pegar 1 lead

  public async getLead(lead: string): Promise<string> {
    return this.http.get(lead, {
      metric: 'lead-get',
    })
  }

  // publica resposta da requisicao dentro da VTEX IO

  public async getLeadWithHeaders(leads: string): Promise<IOResponse<string>> {
    return this.http.getRaw(leads, {
      metric: 'leads-get-raw',
    })
  }
}
