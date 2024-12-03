const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const swaggerDocumentLocalhost = require('./swagger-output-localhost.json');
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
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})