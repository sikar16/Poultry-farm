// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Poultry-Farm",
      version: "1.0.0",
      description: "An API for Poultry-Farm",
    },
    servers: [
      // {
      //   url: "https://Poultry-Farm.onrender.com/",
      //   description: "Production Server",
      // },
      {
        url: "http://192.168.117.19:8888/",
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
