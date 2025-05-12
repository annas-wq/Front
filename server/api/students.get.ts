export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (id) {
    // Get single hero
    const superhero = await event.context.prisma.superheroes.findUnique({
      where: { id: parseInt(id) }
    })
    return superhero || createError({ statusCode: 404, message: 'Hero not found' })
  }
  
  // Get all heroes
  const heroes = await event.context.prisma.superheroes.findMany()
  return heroes
})