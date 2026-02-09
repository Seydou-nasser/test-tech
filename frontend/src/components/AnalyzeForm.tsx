import { useState } from "react";
import { getScoreClass, getScoreLabel } from "../utils/scoreUtils";

interface AnalyzeFormProps {
  onAnalyze: (text: string) => Promise<void>;
  isAnalyzing: boolean;
  lastScore: number | null;
}

/**
 * Composant formulaire d'analyse de texte
 */
export function AnalyzeForm({
  onAnalyze,
  isAnalyzing,
  lastScore,
}: AnalyzeFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    await onAnalyze(text);
  };

  return (
    <div className="analyze-form">
      <h2>Analyser un texte</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Texte à analyser</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez votre texte ici..."
            rows={6}
            disabled={isAnalyzing}
            required
          />
        </div>

        <button type="submit" disabled={isAnalyzing || !text.trim()}>
          {isAnalyzing ? "Analyse en cours..." : "Analyser"}
        </button>
      </form>

      {lastScore !== null && (
        <div className="score-result">
          <h3>Résultat</h3>
          <div className={`score score-${getScoreClass(lastScore)}`}>
            <span className="score-value">{lastScore}</span>
            <span className="score-max">/100</span>
          </div>
          <p className="score-label">{getScoreLabel(lastScore)}</p>
        </div>
      )}
    </div>
  );
}
