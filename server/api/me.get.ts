export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const hero = await event.context.prisma.superheroes.findUnique({
    where: { id }
  })
  return hero || createError({ statusCode: 404, message: 'Hero not found' })
})