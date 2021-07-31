/**
 * Blizzt.io - Blockchain for Game Entrepreneurs and Studios.
 * Development architecture.
 * ================================================
 * @author Germán D. Schneck <german.schneck@blizzt.io>
 *         Jorge Gomes Durán <jorge.gomes@blizzt.io>
 */
// Dependencies
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import express from 'express';

import {
  ApolloServer,
} from 'apollo-server-express';

// GraphQL Instances
import schema from './schema';
import resolvers from './resolvers';
import models, {sequelize} from './models';
import seeds from './seeds';

// Utils
import Console from './utils/bash/console';
import {getMe} from './utils/auth/token';

// Services
import activateCurrencySynchronization from './services/coingecko';

// Express Service
const app = express();

app.use(cors());
app.use(morgan('dev'));

// Apollo Service
const apollo = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: ({message, extensions: {code}}) => ({message, statusCode: code}),
  context: async ({req, connection}) => {
    if (connection) {
      return {
        models,
        loaders: {},
      };
    }

    if (req) {
      const me = await getMe(req);
      return {
        models,
        me,
        secret: process.env.SECRET,
      };
    }
  },
  subscriptions: {},
});

// Middlewares
apollo.applyMiddleware({app, path: '/graphql'});

// Service Listener
const server = http.createServer(app);
const port = process.env.PORT || 8000;

apollo.installSubscriptionHandlers(server);

const force = false;

sequelize.sync({force})
  .then(() => {
    return force ? seeds() : true;
  })
  .then(() => {
    server.listen({port}, () => {
      Console.warn(`Application Listen on http://localhost:${port}/graphql`);

      // Synchronizations
      activateCurrencySynchronization('*/59 * * * * *')
    });
  }).catch(err => {
    throw err;
  });
