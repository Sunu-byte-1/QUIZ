# 🚨 Diagnostic Backend - Problème de Connexion

## ❌ **Problème Identifié**

Le backend sur Render ne répond pas, ce qui explique pourquoi :
1. Les requêtes fetch restent "Pending"
2. `/api` affiche la page du frontend au lieu du JSON

## 🔍 **Diagnostic Rapide**

### 📋 **1. Vérifier le Backend sur Render**

1. **Aller sur** https://dashboard.render.com
2. **Sélectionner votre service** quiz-backend
3. **Vérifier** :
   - Status : "Live" (vert)
   - Variables d'environnement configurées
   - Logs sans erreur

### 📋 **2. Variables d'Environnement Requises**

Sur Render, vérifier que ces variables sont configurées :
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
JWT_SECRET=votre_secret_jwt_tres_securise_ici
NODE_ENV=production
```

### 📋 **3. Redémarrer le Backend**

1. **Aller sur** https://dashboard.render.com
2. **Sélectionner votre service** quiz-backend
3. **Cliquer sur** "Manual Deploy"
4. **Attendre** que le déploiement soit terminé

## 🎯 **Test Rapide**

### 📋 **1. Test du Backend**

```javascript
// Dans la console du navigateur
fetch('https://quiz-zoxq.onrender.com/api')
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => console.log('✅ Backend OK:', data))
.catch(error => console.error('❌ Erreur Backend:', error));
```

### 📋 **2. Test d'Inscription**

```javascript
// Dans la console du navigateur
fetch('https://quiz-zoxq.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'test@test.com',
    password: 'test123',
    prenom: 'Test',
    nom: 'User',
    pays: 'Sénégal',
    age: 25
  })
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => console.log('✅ Inscription:', data))
.catch(error => console.error('❌ Erreur inscription:', error));
```

## 🚨 **Solutions**

### ✅ **Solution 1 : Backend Local (Test Rapide)**

```bash
cd backend
npm start
```

Puis modifier temporairement l'URL dans `src/services/api.ts` :
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

### ✅ **Solution 2 : Railway (Alternative)**

1. **Aller sur** https://railway.app
2. **"New Project"** → "Deploy from GitHub repo"
3. **Sélectionner votre repo** QUIZ
4. **Railway détectera automatiquement** le backend
5. **Ajouter les variables** d'environnement
6. **Mettre à jour l'URL** dans `src/services/api.ts`

### ✅ **Solution 3 : Vérifier MongoDB Atlas**

1. **Aller sur** https://cloud.mongodb.com
2. **Vérifier** que votre cluster est actif
3. **Vérifier** que l'IP 0.0.0.0/0 est autorisée
4. **Vérifier** que l'utilisateur a les bonnes permissions

## 🎯 **Résultat Attendu**

Une fois le backend fonctionnel :
- ✅ `https://quiz-zoxq.onrender.com/api` retourne du JSON
- ✅ Les requêtes fetch ne restent plus "Pending"
- ✅ Inscription et connexion fonctionnelles

Le redémarrage du backend devrait résoudre tous les problèmes ! 🚀 