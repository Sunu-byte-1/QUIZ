# 🚀 Guide d'Hébergement Backend

## 📋 **Prérequis**

### 1. **Base de Données MongoDB**
- **MongoDB Atlas** (Recommandé) : https://mongodb.com/atlas
- **MongoDB Local** : Pour le développement

### 2. **Variables d'Environnement**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
JWT_SECRET=votre_secret_jwt_tres_securise_ici
PORT=5000
NODE_ENV=production
```

## 🎯 **Option 1 : Render (Recommandé - Gratuit)**

### ✅ **Avantages**
- **Gratuit** : 750h/mois
- **Simple** : Déploiement automatique depuis GitHub
- **SSL** : Certificat automatique
- **Base de données** : MongoDB inclus

### 📋 **Étapes de Déploiement**

1. **Créer un compte Render**
   - Aller sur https://render.com
   - S'inscrire avec GitHub

2. **Connecter le Repository**
   - Cliquer sur "New Web Service"
   - Connecter votre repo GitHub
   - Sélectionner le dossier `backend`

3. **Configurer le Service**
   ```
   Name: quiz-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Ajouter les Variables d'Environnement**
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=votre_secret_tres_securise
   NODE_ENV=production
   ```

5. **Déployer**
   - Cliquer sur "Create Web Service"
   - Attendre le déploiement (2-3 minutes)

### 🔗 **URL du Backend**
```
https://quiz-backend.onrender.com
```

---

## 🎯 **Option 2 : Railway (Simple et Rapide)**

### ✅ **Avantages**
- **Gratuit** : 500h/mois
- **Très simple** : Déploiement en 1 clic
- **Base de données** : MongoDB inclus
- **SSL** : Automatique

### 📋 **Étapes de Déploiement**

1. **Créer un compte Railway**
   - Aller sur https://railway.app
   - S'inscrire avec GitHub

2. **Déployer le Projet**
   - Cliquer sur "New Project"
   - Sélectionner "Deploy from GitHub repo"
   - Choisir votre repository

3. **Configurer les Variables**
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=votre_secret_tres_securise
   NODE_ENV=production
   ```

4. **Déployer**
   - Railway détecte automatiquement Node.js
   - Déploiement automatique

### 🔗 **URL du Backend**
```
https://quiz-backend-production.up.railway.app
```

---

## 🎯 **Option 3 : Heroku (Classique)**

### ✅ **Avantages**
- **Fiable** : Plateforme éprouvée
- **Écosystème** : Nombreux add-ons
- **SSL** : Automatique

### 📋 **Étapes de Déploiement**

1. **Installer Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Créer un compte Heroku**
   - Aller sur https://heroku.com
   - Créer un compte

3. **Se connecter**
   ```bash
   heroku login
   ```

4. **Créer l'application**
   ```bash
   cd backend
   heroku create quiz-backend-app
   ```

5. **Configurer les variables**
   ```bash
   heroku config:set MONGO_URI=mongodb+srv://...
   heroku config:set JWT_SECRET=votre_secret_tres_securise
   heroku config:set NODE_ENV=production
   ```

6. **Déployer**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### 🔗 **URL du Backend**
```
https://quiz-backend-app.herokuapp.com
```

---

## 🎯 **Option 4 : Vercel (Pour API)**

### ✅ **Avantages**
- **Gratuit** : Illimité
- **Rapide** : Déploiement en secondes
- **SSL** : Automatique
- **Edge Functions** : Performance optimale

### 📋 **Étapes de Déploiement**

1. **Installer Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Se connecter**
   ```bash
   vercel login
   ```

3. **Déployer**
   ```bash
   cd backend
   vercel
   ```

4. **Configurer les variables**
   ```bash
   vercel env add MONGO_URI
   vercel env add JWT_SECRET
   ```

### 🔗 **URL du Backend**
```
https://quiz-backend.vercel.app
```

---

## 🗄️ **Configuration MongoDB Atlas**

### 📋 **Étapes**

1. **Créer un cluster MongoDB Atlas**
   - Aller sur https://mongodb.com/atlas
   - Créer un compte gratuit
   - Créer un nouveau cluster (gratuit)

2. **Configurer la sécurité**
   - Aller dans "Database Access"
   - Créer un utilisateur avec mot de passe
   - Aller dans "Network Access"
   - Ajouter IP 0.0.0.0/0 (toutes les IPs)

3. **Obtenir l'URI de connexion**
   - Cliquer sur "Connect"
   - Choisir "Connect your application"
   - Copier l'URI

4. **Format de l'URI**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/quiz-app
   ```

---

## 🔧 **Mise à Jour du Frontend**

### 📝 **Modifier l'URL de l'API**

Dans `frontend/src/services/api.ts` :

```typescript
// Remplacer par votre URL de production
const API_BASE_URL = 'https://quiz-backend.onrender.com/api';
// ou
const API_BASE_URL = 'https://quiz-backend-production.up.railway.app/api';
// ou
const API_BASE_URL = 'https://quiz-backend-app.herokuapp.com/api';
```

---

## 🧪 **Test du Déploiement**

### 📋 **Vérifications**

1. **Test de l'API**
   ```bash
   curl https://votre-backend-url.com/
   # Réponse attendue : "API Quiz backend opérationnelle"
   ```

2. **Test de l'inscription**
   ```bash
   curl -X POST https://votre-backend-url.com/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"email":"test@test.com","password":"test123","prenom":"Test","nom":"User","pays":"Sénégal","age":25}'
   ```

3. **Test de la connexion**
   ```bash
   curl -X POST https://votre-backend-url.com/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email":"test@test.com","password":"test123"}'
   ```

---

## 🎯 **Recommandation Finale**

### 🏆 **Render (Option 1)**
- **Pourquoi** : Gratuit, simple, MongoDB inclus
- **Temps de déploiement** : 5 minutes
- **Coût** : 0€/mois

### 🚀 **Railway (Option 2)**
- **Pourquoi** : Très simple, rapide
- **Temps de déploiement** : 2 minutes
- **Coût** : 0€/mois (500h)

---

## 🔒 **Sécurité**

### ✅ **Bonnes Pratiques**

1. **Variables d'environnement**
   - Ne jamais commiter les secrets
   - Utiliser des variables d'environnement

2. **JWT Secret**
   - Utiliser un secret fort (32+ caractères)
   - Changer régulièrement

3. **MongoDB**
   - Utiliser des identifiants forts
   - Limiter les accès IP si possible

4. **CORS**
   - Configurer uniquement votre domaine frontend
   - Éviter `*` en production

---

## 🎉 **Déploiement Terminé !**

Une fois déployé, votre backend sera accessible via HTTPS et prêt à recevoir les requêtes de votre frontend !

**Prochaine étape** : Déployer le frontend et connecter les deux services. 