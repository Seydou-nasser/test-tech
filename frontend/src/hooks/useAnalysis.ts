import { useState, useEffect, useCallback } from "react";
import { apiService } from "../services/apiService";
import type { Analysis } from "../types";

interface UseAnalysisResult {
  // État
  isAnalyzing: boolean;
  isLoadingHistory: boolean;
  error: string | null;
  lastScore: number | null;
  history: Analysis[];

  // Actions
  analyzeText: (text: string) => Promise<void>;
  refreshHistory: () => Promise<void>;
}

/**
 * Hook personnalisé pour gérer l'analyse de texte et l'historique
 */
export function useAnalysis(): UseAnalysisResult {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [history, setHistory] = useState<Analysis[]>([]);

  /**
   * Récupère l'historique
   */
  const refreshHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    setError(null);

    try {
      const response = await apiService.getHistory(50, 0);
      setHistory(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement de l'historique";
      setError(errorMessage);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  /**
   * Analyse un texte
   */
  const analyzeText = useCallback(
    async (text: string) => {
      setIsAnalyzing(true);
      setError(null);

      try {
        const response = await apiService.analyzeText(text);
        setLastScore(response.score);

        // Rafraîchir l'historique après l'analyse
        await refreshHistory();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(errorMessage);
        setLastScore(null);
      }
      setIsAnalyzing(false);
    },
    [refreshHistory],
  );

  /**
   * Charge l'historique au montage du composant
   */
  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  return {
    isAnalyzing,
    isLoadingHistory,
    error,
    lastScore,
    history,
    analyzeText,
    refreshHistory,
  };
}
