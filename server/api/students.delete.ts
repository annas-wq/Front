export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  
  await event.context.prisma.superheroes.delete({
    where: { id }
  })
  
  return { status: 'OK' }
})