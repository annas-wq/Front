export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Валидация
  if (!body.hero_name || !body.real_name || !body.powers || !body.universe) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  return await event.context.prisma.superheroes.create({
    data: {
      hero_name: body.hero_name,
      real_name: body.real_name,
      powers: body.powers,
      universe: body.universe,
      first_appearance: body.first_appearance || null
    }
  })
})