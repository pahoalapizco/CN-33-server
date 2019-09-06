require('dotenv').config(); // Variables de entorno (desarrollo)

import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

import { getContext, AuthDirective } from './actions/authActions' 

const DATA_BASE = process.env.ENV === 'test' ? process.env.TESTDATABASE : process.env.DATABASE


mongoose.connect(DATA_BASE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})

const mongoDB = mongoose.connection

mongoDB.on('error', console.error.bind(console, 'Error de conexión !!'))
mongoDB.on('open', () => console.log('BD Conectada!!'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    AuthDirective: AuthDirective
  },
  context: async ({ req }) => getContext(req)
})

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
