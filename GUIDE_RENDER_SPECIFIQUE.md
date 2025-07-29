# 🚀 Guide Spécifique Render - Structure Frontend/Backend

## 📋 **Problème Identifié**

Quand vous avez un projet avec cette structure :
```
QUIZ/
├── frontend/
└── backend/
```

Render ne peut pas automatiquement détecter le dossier `backend`. Voici comment résoudre cela :

## 🎯 **Solution 1 : Utiliser le fichier render.yaml (Recommandé)**

### ✅ **Étapes :**

1. **Le fichier `render.yaml` est déjà créé à la racine**
   - Il spécifie `rootDir: backend`
   - Render utilisera automatiquement ce fichier

2. **Déployer sur Render :**
   - Aller sur https://render.com
   - Créer un compte avec GitHub
   - Cliquer sur "New Web Service"
   - Connecter votre repo GitHub
   - **IMPORTANT** : Sélectionner le repository entier (pas de dossier spécifique)
   - Render détectera automatiquement le fichier `render.yaml`

3. **Configuration automatique :**
   - Name : `quiz-backend` (automatique)
   - Environment : `Node` (automatique)
   - Build Command : `npm install` (automatique)
   - Start Command : `npm start` (automatique)

4. **Ajouter les variables d'environnement :**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
   JWT_SECRET=votre_secret_jwt_tres_securise_ici
   NODE_ENV=production
   ```

5. **Cliquer sur "Create Web Service"**

## 🎯 **Solution 2 : Configuration Manuelle**

Si le fichier `render.yaml` ne fonctionne pas :

### ✅ **Étapes :**

1. **Créer le service :**
   - Aller sur https://render.com
   - "New Web Service"
   - Connecter votre repo GitHub
   - Sélectionner le repository entier

2. **Configuration manuelle :**
   ```
   Name: quiz-backend
   Environment: Node
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Variables d'environnement :**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
   JWT_SECRET=votre_secret_jwt_tres_securise_ici
   NODE_ENV=production
   ```

## 🎯 **Solution 3 : Déploiement Séparé**

Si les solutions précédentes ne marchent pas :

### ✅ **Étapes :**

1. **Créer un repository séparé pour le backend :**
   ```bash
   # Créer un nouveau repo sur GitHub
   # Copier seulement le dossier backend
   ```

2. **Déployer le backend séparément :**
   - Connecter le repo backend
   - Configuration standard
   - Pas besoin de spécifier de dossier

## 🔧 **Vérification du Déploiement**

### 📋 **Test de l'API :**

```bash
# Test de base
curl https://quiz-backend.onrender.com/

# Test d'inscription
curl -X POST https://quiz-backend.onrender.com/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "test@test.com",
  "password": "test123",
  "prenom": "Test",
  "nom": "User",
  "pays": "Sénégal",
  "age": 25
}'

# Test de connexion
curl -X POST https://quiz-backend.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@test.com",
  "password": "test123"
}'
```

## 🎯 **Mise à Jour du Frontend**

Une fois le backend déployé, mettre à jour l'URL dans `frontend/src/services/api.ts` :

```typescript
const API_BASE_URL = 'https://quiz-backend.onrender.com/api';
```

## 🚨 **Problèmes Courants**

### ❌ **Erreur : "No package.json found"**
- **Solution** : Vérifier que le `rootDir` pointe vers le bon dossier
- **Vérification** : Le fichier `backend/package.json` doit exister

### ❌ **Erreur : "Build failed"**
- **Solution** : Vérifier les variables d'environnement
- **Vérification** : `MONGO_URI` et `JWT_SECRET` doivent être définis

### ❌ **Erreur : "Cannot find module"**
- **Solution** : Vérifier que `npm install` s'exécute correctement
- **Vérification** : Les dépendances sont installées

## 🎉 **Déploiement Réussi !**

Une fois déployé, votre backend sera accessible via :
```
https://quiz-backend.onrender.com
```

### 📋 **Checklist Final :**

- [ ] Backend déployé sur Render
- [ ] Variables d'environnement configurées
- [ ] MongoDB Atlas connecté
- [ ] API testée et fonctionnelle
- [ ] Frontend mis à jour avec la nouvelle URL
- [ ] Application complète testée

## 🆘 **Aide Supplémentaire**

Si vous rencontrez encore des problèmes :

1. **Vérifier les logs** dans l'interface Render
2. **Tester localement** : `cd backend && npm start`
3. **Vérifier la structure** des fichiers
4. **Consulter la documentation** Render

Le fichier `render.yaml` à la racine devrait résoudre le problème de sélection de dossier ! 🚀 