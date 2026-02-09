import type { AnalysisResult } from "../types/index.js";

/**
 * Configuration des règles d'analyse
 */
const ANALYSIS_CONFIG = {
  BASE_SCORE: 50,
  LENGTH_THRESHOLD: 100,
  LENGTH_BONUS: 20,
  FORBIDDEN_WORDS: ["fraude", "illégal", "faux", "illegal", "fraud", "fake"],
  FORBIDDEN_WORD_PENALTY: 10,
  MIN_SCORE: 0,
  MAX_SCORE: 100,
} as const;

/**
 * Service d'analyse de texte
 * Calcule un score de conformité basé sur des règles métier
 */
export class AnalysisService {
  /**
   * Analyse un texte et retourne un score de conformité (0-100)
   *
   * Règles:
   * - Score de base: 50
   * - +20 points si le texte contient plus de 100 caractères
   * - -10 points par mot interdit trouvé
   * - Score final borné entre 0 et 100
   *
   * @param text - Le texte à analyser
   * @returns Résultat de l'analyse avec le score et les détails
   */
  analyzeText(text: string): AnalysisResult {
    let score: number = ANALYSIS_CONFIG.BASE_SCORE;

    // Règle 1: si texte > 100 caractères
    if (text.length > ANALYSIS_CONFIG.LENGTH_THRESHOLD) {
      score += ANALYSIS_CONFIG.LENGTH_BONUS;
    }

    // Règle 2: Pénalité pour chaque mot interdit
    const textLower = text.toLowerCase();
    for (const forbiddenWord of ANALYSIS_CONFIG.FORBIDDEN_WORDS) {
      // Utilisation d'une regex pour correspondre au mot entier ou s'assurer que c'est bien présent
      // Pour rester simple et respecter "contient", on va éviter de double-compter les sous-mots
      // si un mot plus long a déjà été pénalisé pour le même emplacement
      const regex = new RegExp(`\\b${forbiddenWord}\\b`, "i");
      if (regex.test(textLower)) {
        score -= ANALYSIS_CONFIG.FORBIDDEN_WORD_PENALTY;
      }
    }

    // Borner le score entre 0 et 100
    score = Math.max(
      ANALYSIS_CONFIG.MIN_SCORE,
      Math.min(ANALYSIS_CONFIG.MAX_SCORE, score),
    );

    return {
      score,
    };
  }

  /**
   * Obtient la configuration des règles d'analyse
   * Utile pour les tests et la documentation
   */
  getConfig() {
    return { ...ANALYSIS_CONFIG };
  }
}

export const analysisService = new AnalysisService();
