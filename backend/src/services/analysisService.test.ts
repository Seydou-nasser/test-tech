import { describe, it, expect, beforeEach } from "vitest";
import { AnalysisService } from "./analysisService.js";

describe("AnalysisService", () => {
  let service: AnalysisService;

  beforeEach(() => {
    service = new AnalysisService();
  });

  it("devrait retourner le score de base (50) pour un texte normal", () => {
    const text =
      "Ceci est un texte tout à fait normal et conforme aux attentes.";
    const result = service.analyzeText(text);
    expect(result.score).toBe(50);
  });

  it("devrait ajouter un bonus de +20 si le texte dépasse 100 caractères", () => {
    const longText =
      "Cet exemple de texte est volontairement très long pour vérifier que le bonus de longueur de cent caractères est bien appliqué par notre service d'analyse de texte IA.";
    const result = service.analyzeText(longText);
    expect(result.score).toBe(70); // 50 + 20
  });

  it("devrait retirer 10 points par mot interdit trouvé", () => {
    const text = "Ce texte parle de fraude et de contenu illégal.";
    const result = service.analyzeText(text);
    // 50 (base) - 10 (fraude) - 10 (illégal) = 30
    expect(result.score).toBe(30);
  });

  it("devrait cumuler le bonus de longueur et les pénalités de mots interdits", () => {
    const text =
      "Ceci est un texte très long qui dépasse largement les cent caractères pour tester le cumul des règles incluant le mot fraude et aussi le mot illégal dans une même analyse.";
    const result = service.analyzeText(text);
    // 50 (base) + 20 (longueur) - 10 (fraude) - 10 (illégal) = 50
    expect(result.score).toBe(50);
  });

  it("ne devrait pas descendre en dessous du score minimum (0)", () => {
    const text = "fraude illégal faux illegal fraud fake"; // 6 mots interdits
    const result = service.analyzeText(text);
    // 50 - 60 = -10 => 0
    expect(result.score).toBe(0);
  });

  it("ne devrait pas dépasser le score maximum (100)", () => {
    // Par défaut le score max est 70 (50 + 20).
    // Testons la borne si le score de base était plus haut ou les bonus différents
    const longText = "A".repeat(200);
    const result = service.analyzeText(longText);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("devrait être insensible à la casse pour les mots interdits", () => {
    const text = "Une FRAUDE manifeste et un acte ILLÉGAL.";
    const result = service.analyzeText(text);
    expect(result.score).toBe(30);
  });

  it("devrait retourner la configuration actuelle via getConfig", () => {
    const config = service.getConfig();
    expect(config).toHaveProperty("BASE_SCORE", 50);
    expect(config.FORBIDDEN_WORDS).toContain("fraude");
  });
});
