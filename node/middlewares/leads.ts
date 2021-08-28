// importa resposta de erro dentro da vtex caso de errado a requisiçao
// import { UserInputError } from '@vtex/api'
// import { json } from 'co-body'

export async function leads(ctx: Context, next: () => Promise<any>) {
  // const body = (await json(ctx.req))
  // as { leads: string}

  // define os headers

  // define controle de cache

  ctx.set('Cache-Control', 'no-cache no-store')

  // define key para vtex
  ctx.set('X-VTEX-Use-Https', 'true')

  // define autorizacoes

  ctx.set('Proxy-Authorization', 'ctx.authToken')

  // se der erro na hora de pegar um lead, entao aparece um codigo de erro na tela

  // if (!body?.leads) {
  //    throw new UserInputError('Code is required') // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  // }

  // const { leads } = body

  // cria um testa pra ver se a requisicao funciona
  // console.info("Acho que deu certo, mas n sei= ",
  // await ctx.clients.leads.getLeads(leads)

  const res = await ctx.clients.leads.getLeads('leads').catch((reason) => {
    return reason?.response?.data
  })

  // define resposta com tempo de espera

  ctx.body = res

  await next()
}
