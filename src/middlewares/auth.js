import { EError } from "../enums/EError.js";

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.json({
        status: "error",
        message: "necesitas estar autenticado",
      });
    }
    if (!roles.includes(req.user.rol)) {
      return res.json({ status: "error", message: "no estas autorizado" });
    }
    next();
  };
};

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EError.INVALID_JSON:
      res.json({ status: "error", error: error.cause, message: error.message });
      break;
    case EError.DATABASE_ERROR:
      res.json({ status: "error", error: error.message });
      break;
    case EError.INVALID_PARAM:
      res.json({ status: "error", error: error.cause });
      break;
    default:
      res.json({
        status: "error",
        message: "Hubo un error, contacte al equipo de soporte",
      });
      break;
  }
};
