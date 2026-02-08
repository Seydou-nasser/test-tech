import express from "express";
import cors from "cors";
import "dotenv/config";
import analysisRoutes from "./src/routes/analysisRoutes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./src/middlewares/errorHandler.js";
import { prisma } from "./src/config/database.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "API d'analyse de texte",
    version: "1.0.0",
    endpoints: {
      analyze: "POST /api/analyze",
      history: "GET /api/history",
    },
  });
});

app.use("/api", analysisRoutes);

// Gestion des erreurs
app.use(notFoundHandler);
app.use(errorHandler);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});

// Gestion de la fermeture du serveur
process.on("exit", async (code) => {
  await prisma.$disconnect();
  console.log(`About to exit with code: ${code}`);
});
