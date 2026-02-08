import { prisma } from "../config/database.js";
import type { Analysis } from "../types/index.js";

/**
 * Repository pour la gestion des analyses en base de données
 * Encapsule toutes les opérations CRUD
 */
export class AnalysisRepository {
  /**
   * Crée une nouvelle analyse en base de données
   * @param text - Le texte analysé
   * @param score - Le score calculé
   * @returns L'analyse créée
   */
  async create(text: string, score: number): Promise<Analysis> {
    return await prisma.analysis.create({
      data: {
        text,
        score,
      },
    });
  }

  /**
   * Récupère toutes les analyses, triées par date décroissante
   * @param limit - Nombre maximum de résultats (optionnel)
   * @param offset - Décalage pour la pagination (optionnel)
   * @returns Liste des analyses
   */
  async findAll(limit?: number, offset?: number): Promise<Analysis[]> {
    return await prisma.analysis.findMany({
      orderBy: {
        createdAt: "desc",
      },
      ...(limit !== undefined && { take: limit }),
      ...(offset !== undefined && { skip: offset }),
    });
  }

  /**
   * Récupère une analyse par son ID
   * @param id - L'identifiant de l'analyse
   * @returns L'analyse ou null si non trouvée
   */
  async findById(id: string): Promise<Analysis | null> {
    return await prisma.analysis.findUnique({
      where: { id },
    });
  }

  /**
   * Compte le nombre total d'analyses
   * @returns Le nombre total d'analyses
   */
  async count(): Promise<number> {
    return await prisma.analysis.count();
  }
}

export const analysisRepository = new AnalysisRepository();
