import type { Request, Response, NextFunction } from "express";

/**
 * Middleware de gestion globale des erreurs
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error("Error:", err);

  // Erreur Prisma
  if (err.name === "PrismaClientKnownRequestError") {
    res.status(400).json({
      status: "error",
      message: "Database error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
    return;
  }

  // Erreur générique
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

/**
 * Middleware pour les routes non trouvées
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.path,
  });
};
