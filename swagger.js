const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();

// Swagger autogen for localhost
const docLocalhost = {
  info: {
    title: 'Art Shop API',
    description: 'Art Shop Public API'
  },
  host: `localhost:${process.env.PORT || 3000}`,
  schemes: ['http']
};

const outputFileLocalhost = './swagger-output-localhost.json';
const routesLocalhost = ['./server.js'];

swaggerAutogen(outputFileLocalhost, routesLocalhost, docLocalhost);

// Swagger autogen for prod
const doc = {
  info: {
    title: 'Art Shop API',
    description: 'Art Shop Public API'
  },
  host: '',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);
