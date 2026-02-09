import "./App.css";
import { useAnalysis } from "./hooks/useAnalysis";
import { AnalyzeForm } from "./components/AnalyzeForm";
import { HistoryList } from "./components/HistoryList";

function App() {
  const {
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
  } = useAnalysis();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Analyse de Texte</h1>
        <p>Service d'analyse de conformité de texte</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className="app-content">
          <AnalyzeForm
            onAnalyze={analyzeText}
            isAnalyzing={isAnalyzing}
            lastScore={lastScore}
          />

          <HistoryList
            history={history}
            isLoading={isLoadingHistory}
            onRefresh={refreshHistory}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            totalPages={totalPages}
            onNext={nextPage}
            onPrev={prevPage}
            onPageChange={goToPage}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Test Technique — Développeur Fullstack</p>
      </footer>
    </div>
  );
}

export default App;
