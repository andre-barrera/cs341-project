const swaggerAutogen = require('swagger-autogen')();

const doc = {
  swagger: '2.0',
  info: {
    title: 'Users Api',
    description: 'Users Api'
  },
  host: 'localhost:3001',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);