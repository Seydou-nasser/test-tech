import type {
  AnalyzeRequest,
  AnalyzeResponse,
  HistoryResponse,
  ErrorResponse,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Service pour communiquer avec l'API backend
 */
class ApiService {
  /**
   * Analyse un texte
   * @param text - Le texte à analyser
   * @returns Le score et le statut
   */
  async analyzeText(text: string): Promise<AnalyzeResponse> {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text } as AnalyzeRequest),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || "Erreur lors de l'analyse");
    }

    return response.json();
  }

  /**
   * Récupère l'historique des analyses
   * @param limit - Nombre de résultats
   * @param offset - Décalage pour la pagination
   * @returns L'historique avec pagination
   */
  async getHistory(
    limit: number = 50,
    offset: number = 0,
  ): Promise<HistoryResponse> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/api/history?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(
        error.message || "Erreur lors de la récupération de l'historique",
      );
    }

    return response.json();
  }
}

export const apiService = new ApiService();
