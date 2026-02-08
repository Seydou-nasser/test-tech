import { Router } from "express";
import { analysisController } from "../controllers/analysisController.js";

const router = Router();

/**
 * POST /api/analyze
 * Analyse un texte et retourne un score
 */
router.post("/analyze", (req, res, next) =>
  analysisController.analyze(req, res, next),
);

/**
 * GET /api/history
 * Récupère l'historique des analyses
 */
router.get("/history", (req, res, next) =>
  analysisController.getHistory(req, res, next),
);

export default router;
