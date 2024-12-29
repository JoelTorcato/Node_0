import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'


const server = fastify() 
// const database = new DatabaseMemory() // database = DatabaseMemory()
const database = new DatabasePostgres()

// Request Body

server.post('/videos', async (request, reply) => { // POST is used to submit data to be processed by the server
  const { title, description, duration, channel } = request.body

  await database.create({
    title, // title, = title: title; (Short syntax)
    description,
    duration,
    channel,
  })
  
  /* request: Contains all information about the incoming 
  HTTP request (headers, query parameters, body, etc.).

  // request.body: Contains the data sent by the client in the 
  request body, which is typically used for operations like creating 
  or updating resources */

  return reply.status(201).send() // We create something
})

server.get('/videos', async (request) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

server.put('/videos/:id', async (request, reply) => { // PUT is used to update or replace a resource on the server
  const videoId = request.params.id
  const { title, description, duration, channel } = request.body

  await database.update(videoId, {
    title, 
    description,
    duration,
    channel,
  })

  return reply.status(204).send
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send() 
})

server.listen({
  port: process.env.PORT ?? 3333,
})