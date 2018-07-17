var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

function graphqlMiddleware() {
  var app = express();

  var schema = buildSchema(`
    type Movie {
      id: String!
      manifest: String
      name: String
    }

    type Query {
      movie(id: String): Movie
      movies: [Movie]
    }
  `);

  var movies = {
    '1': {
      id: '1',
      manifest: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
      name: 'Star Trek',
    },
    '2': {
      id: '2',
      manifest: 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd',
      name: 'Sintel',
    },
    '3': {
      id: '3',
      manifest: 'https://storage.googleapis.com/shaka-demo-assets/heliocentrism/heliocentrism.mpd',
      name: 'Heliocentrism',
    }
  };

  var rootValue = {
    movie({ id }) {
      return movies[id];
    },
    movies() {
      return Object.values(movies);
    },
  };

  app.use(graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  }));

  return app;
}

module.exports = exports = graphqlMiddleware;