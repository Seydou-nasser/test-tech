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
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;

  // Actions
  analyzeText: (text: string) => Promise<void>;
  refreshHistory: () => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
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

  // États de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  /**
   * Récupère l'historique
   */
  const refreshHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    setError(null);

    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const response = await apiService.getHistory(itemsPerPage, offset);
      setHistory(response.data);
      setTotalItems(response.pagination.total);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement de l'historique";
      setError(errorMessage);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [currentPage, itemsPerPage]);

  /**
   * Actions de navigation
   */
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages],
  );

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

        // Revenir à la première page pour voir la nouvelle analyse
        if (currentPage !== 1) {
          setCurrentPage(1);
        } else {
          await refreshHistory();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(errorMessage);
        setLastScore(null);
      }
      setIsAnalyzing(false);
    },
    [currentPage, refreshHistory],
  );

  /**
   * Charge l'historique au montage ou changement de page
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
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    analyzeText,
    refreshHistory,
    nextPage,
    prevPage,
    goToPage,
  };
}
