import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"

import { createConnection } from "typeorm"

import express from "express"
import cors from "cors"

import session from "express-session"
import connectRedis from "connect-redis"
import { redis } from "./redis"

const main = async () => {
    await createConnection()

    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"]
    })
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res })
    })
    const app = express()
    const RedisStore = connectRedis(session)

    app.use(cors({
        credentials: true,
    }))

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