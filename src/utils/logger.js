import winston from "winston";

const logger = winston.createLogger({
  transports: [
    //Definir diferentes sistemas de almacenamiento de logs/mensajes
    new winston.transports.Console({ level: "http" }),
  ],
});

//Create middleware para el logger
export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(`${req.url} - method: ${req.method}`);
  next();
};
