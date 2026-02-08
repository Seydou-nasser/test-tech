import { z } from "zod";

/**
 * Schéma de validation pour la requête d'analyse
 */
export const analyzeRequestSchema = z.object({
  text: z
    .string()
    .min(1, "Le texte ne peut pas être vide")
    .max(10000, "Le texte ne peut pas dépasser 10000 caractères")
    .trim(),
});

/**
 * Schéma de validation pour les paramètres de pagination
 */
export const paginationSchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 50))
    .pipe(z.number().min(1).max(100)),
  offset: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 0))
    .pipe(z.number().min(0)),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
