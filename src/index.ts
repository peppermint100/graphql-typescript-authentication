import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"

import { createConnection } from "typeorm"
import { createSchema } from './createSchema';

import express from "express"
import cors from "cors"

import session from "express-session"
import connectRedis from "connect-redis"
import { redis } from "./redis"

import { graphqlUploadExpress } from 'graphql-upload';
import { graphqlHTTP } from "express-graphql"

const main = async () => {
    await createConnection()

    const schema = await createSchema()

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        uploads: false
    })

    const app = express()
    const RedisStore = connectRedis(session)

    app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }), graphqlHTTP({ schema }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())


    app.use(session({
        store: new RedisStore({
            client: redis as any
        }),
        name: "qid",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    }))

    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log('GraphQL Server Running...')
    })

}

main()

