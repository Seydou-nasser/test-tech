import type { Analysis } from "../types";
import { getScoreClass } from "../utils/scoreUtils";
import { formatDate, truncateText } from "../utils/formatUtils";

interface HistoryListProps {
  history: Analysis[];
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}

/**
 * Composant d'affichage de l'historique des analyses
 */
export function HistoryList({
  history,
  isLoading,
  onRefresh,
}: HistoryListProps) {
  if (isLoading) {
    return (
      <div className="history-list">
        <h2>Historique des analyses</h2>
        <p className="loading">Chargement...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="history-list">
        <h2>Historique des analyses</h2>
        <p className="empty">Aucune analyse pour le moment</p>
      </div>
    );
  }

  return (
    <div className="history-list">
      <div className="history-header">
        <h2>Historique des analyses</h2>
        <button
          onClick={onRefresh}
          className="refresh-btn"
          disabled={isLoading}
        >
          ↻ Actualiser
        </button>
      </div>

      <div className="history-items">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-item-header">
              <span
                className={`score-badge score-${getScoreClass(item.score)}`}
              >
                {item.score}/100
              </span>
              <span className="date">{formatDate(item.createdAt)}</span>
            </div>
            <p className="text-preview">{truncateText(item.text, 150)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
