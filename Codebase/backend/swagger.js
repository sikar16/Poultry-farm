// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Picture Ethiopia Platform",
      version: "1.0.0",
      description: "An API for Picture Ethiopia Platform",
    },
    servers: [
      {
        url: "https://picture-ethiopia.onrender.com/",
        description: "Production Server",
      },
      {
        url: "http://localhost:5000/",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // this api docs should be standalone files.
  apis: ["./routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
