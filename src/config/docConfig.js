import { __dirname } from "../utils.js";
import swaggerJsdoc from "swagger-jsdoc";

//Definicon de swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion API Franco L.",
      description: "API REST para gestionar un E-Commerce",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);
