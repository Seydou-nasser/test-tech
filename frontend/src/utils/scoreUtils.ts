/**
 * Retourne la classe CSS en fonction du score
 */
export function getScoreClass(score: number): string {
  if (score >= 75) return "good";
  if (score >= 50) return "medium";
  return "low";
}

/**
 * Retourne le label en fonction du score
 */
export function getScoreLabel(score: number): string {
  if (score >= 75) return "Excellent score de conformité";
  if (score >= 50) return "Score de conformité acceptable";
  return "Score de conformité faible";
}
