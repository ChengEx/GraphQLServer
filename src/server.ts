import "reflect-metadata";
import express, { Express } from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import schema from './graphql/schema'
import resolvers from './graphql/resolvers/index'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
    mongoose.connect(
        "mongodb+srv://denoriaaa:SQ3No7zNIIwTmSBI@cluster0.hnuu7.mongodb.net/SecondHandMarket?retryWrites=true&w=majority"
    ).then(()=>{
        console.log('Connected to mongoDB');
    })
    .catch((error)=> {
        console.log('Connected Error');
        console.log(error);
    })

    const apolloServer = new ApolloServer({
      typeDefs: schema, 
      resolvers: resolvers,
      // schema: await buildSchema({
      //   resolvers: [TaskResolver],
      //   validate: false,
      // }),
    });
    apolloServer.listen({ port: 5000}).then(res =>{
      //console.log(res);
      console.log(`Server running at ${res.url}`)
    })
    // await apolloServer.start();
    // const app: Express = express();
    // apolloServer.applyMiddleware({ app });
    // app.get("/", (_req, res) => res.send("hello world"));
    // const PORT = process.env.PORT || 8000;
    // app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`));
};

main().catch((err) => console.error(err));