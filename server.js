import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify() 
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
  const { title, description, duration, channel } = request.body // Destructuring

  await database.create (video, {
    title,
    description,
    duration,
    channel,
  })

  return reply.status(201).send()
})

server.get('/videos', async (request) => {
  const search = request.query.search
  const videos = await database.list(search)

  return videos
})

server.put('/videos/:id', async (request, reply) => { // PUT is used to update or replace a resource on the server
  const videoId = request.params.id
  const { title, description } = request.body

  await database.update(videoId, {
    title, 
    description,
  })

  return reply.status(204).send
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send() 
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})