import type { Request, Response, NextFunction } from "express";
import { analysisService } from "../services/analysisService.js";
import { analysisRepository } from "../repositories/analysisRepository.js";
import {
  analyzeRequestSchema,
  paginationSchema,
} from "../validators/analysisValidator.js";
import { ZodError } from "zod";

/**
 * Controller pour les endpoints d'analyse
 */
export class AnalysisController {
  /**
   * POST /api/analyze
   * Analyse un texte et retourne un score de conformité
   */
  async analyze(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Validation de la requête
      const { text } = analyzeRequestSchema.parse(req.body);

      // Analyse du texte
      const result = analysisService.analyzeText(text);

      // Sauvegarde en base de données
      await analysisRepository.create(text, result.score);

      // Réponse
      res.status(200).json({
        score: result.score,
        status: "ok",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "error",
          message: "Validation error",
          errors: error.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  }

  /**
   * GET /api/history
   * Récupère l'historique des analyses
   */
  async getHistory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Validation des paramètres de pagination
      const { limit, offset } = paginationSchema.parse(req.query);

      // Récupération des analyses
      const analyses = await analysisRepository.findAll(limit, offset);
      const total = await analysisRepository.count();

      // Réponse
      res.status(200).json({
        data: analyses,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "error",
          message: "Validation error",
          errors: error.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  }
}

export const analysisController = new AnalysisController();
