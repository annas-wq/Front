export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  
  return await event.context.prisma.superheroes.update({
    where: { id },
    data: {
      hero_name: body.hero_name,
      real_name: body.real_name,
      powers: body.powers,
      universe: body.universe,
      first_appearance: body.first_appearance
    }
  })
})