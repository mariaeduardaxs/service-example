// importar arquivo json do body da requsicao

// import { json } from 'co-body'

// exporta leads da aws

export async function lead(ctx: Context, next: () => Promise<any>) {
  // retorna com o body

  // const body = (await json(ctx.req)) as { userEmail: string }

  ctx.set('Cache-Control', 'no-cache no-store')

  // define key para vtex

  ctx.set('X-VTEX-Use-Https', 'true')

  // define autorizacoes

  ctx.set('Proxy-Authorization', 'ctx.authToken')

  // const { userEmail } = body

  const res = await ctx.clients.leads.getLead('lead').catch((reason) => {
    return reason?.response?.data
  })

  // define resposta com tempo de espera

  ctx.body = res

  await next()
}
