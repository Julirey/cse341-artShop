const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const swaggerDocumentLocalhost = require('./swagger-output-localhost.json');
const mongodb = require('./data/database')
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

// Swagger Middleware
if (process.env.ENVIRONMENT == 'dev') {
  app.use('/api-docs', swaggerUi.serve);
  app.use('/api-docs', swaggerUi.setup(swaggerDocumentLocalhost));
} else {
  app.use('/api-docs', swaggerUi.serve);
  app.use('/api-docs', swaggerUi.setup(swaggerDocument));
}

// Routes
app.use('/', require('./routes'))

// Connect to database and start server
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  }
});
