# Test Technique — Service d'Analyse de Texte

Ce projet est un prototype de service d'analyse de conformité de texte, composé d'une API backend (Node.js/Express/Prisma) et d'une application frontend (React/TypeScript).

## 🚀 Fonctionnalités

- **Analyse de texte** : Calcul d'un score de conformité (0-100) basé sur des règles métier (longueur du texte, détection de mots interdits).
- **Historique** : Consultation des analyses précédentes.
- **Pagination** : Gestion performante de l'historique côté serveur et client.
- **Design Minimaliste** : Interface épurée respectant une charte sobre (Noir/Blanc/Gris).
- **Tests Unitaires** : Validation rigoureuse de la logique d'analyse.
- **Dockerisation** : Déploiement simplifié avec Docker Compose.

---

## 🛠 Choix Techniques

### Backend

- **Node.js & Express** : Pour un serveur léger et performant.
- **Prisma ORM** : Pour une gestion simplifiée et typée de la base de données PostgreSQL.
- **Zod** : Pour la validation stricte des schémas de données entrants.
- **Vitest** : Un framework de test moderne utilisé pour les tests unitaires du service d'analyse.
- **Architecture** : Séparation claire en `Controller` / `Service` / `Repository` pour assurer la maintenabilité.

### Frontend

- **React (Vite)** : Pour un démarrage rapide et une expérience de développement fluide.
- **TypeScript** : Pour un typage strict sur l'ensemble de la stack.
- **Custom Hook (`useAnalysis`)** : Centralisation de la logique d'état et des appels API pour des composants plus "purs".
- **CSS Pur** : Approche minimaliste sans framework CSS lourd, privilégiant la performance et la personnalisation fine.

---

## 📦 Installation et Lancement

### Chemin le plus rapide (Docker)

Assurez-vous d'avoir Docker Desktop lancé sur votre machine.

```bash
docker compose up --build
```

L'application sera accessible aux adresses suivantes :

- **Frontend** : [http://localhost:8080](http://localhost:8080)
- **API Backend** : [http://localhost:3000](http://localhost:3000)

### Installation locale (Développement)

#### 1. Backend

```bash
cd backend
npm install
# Créez un fichier .env basé sur l'URL de votre base de données PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/analysis_db?schema=public"
npx prisma migrate dev
npm run dev
```

#### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Tests

Pour lancer les tests unitaires du service d'analyse (logique de score) :

```bash
cd backend
npm test
```

---

## 📂 Structure du Projet

```text
├── backend/
│   ├── prisma/             # Schéma et migrations DB
│   ├── src/
│   │   ├── controllers/    # Gestion des requêtes HTTP
│   │   ├── services/       # Logique métier (Analyse IA)
│   │   ├── repositories/   # Accès aux données (Prisma)
│   │   ├── types/          # Interfaces TypeScript
│   │   └── validators/     # Schémas de validation Zod
│   └── index.ts            # Point d'entrée de l'API
│   └── Dockerfile          # Configuration Docker pour le backend
├── frontend/
│   ├── src/
│   │   ├── components/     # Composants UI (Form, List, Pagination)
│   │   ├── hooks/          # Logique d'état (useAnalysis)
│   │   ├── services/       # Client API
│   │   └── utils/          # Formattage et calculs
│   └── App.tsx             # Composant racine
│   └── Dockerfile          # Configuration Docker pour le frontend
└── docker-compose.yml      # Orchestration des conteneurs
```

---

## 📝 Logique d'Analyse (Règles métier)

Le score est calculé par le `AnalysisService` selon les règles suivantes :

- **Base** : 50 points.
- **Bonus Longueur** : +20 points si le texte dépasse 100 caractères.
- **Pénalité** : -10 points pour chaque mot interdit trouvé (ex: "fraude", "illégal").
- **Bornes** : Le score final est strictement compris entre 0 et 100.

## 🔮 Améliorations possibles

Dans un contexte de production, plusieurs évolutions pourraient être envisagées :

- Authentification et gestion des accès
- Journalisation (logs) et monitoring
- Externalisation des règles d’analyse via configuration ou base de données
- Sécurisation renforcée (rate limiting, headers, etc.)
