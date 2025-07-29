# 🚨 Dépannage Final - Failed to Fetch

## ❌ **Problème Persistant**

L'erreur "Failed to fetch" persiste pour l'inscription et la connexion. Procédons étape par étape.

## 🔍 **Diagnostic Étape par Étape**

### 📋 **1. Test Direct de l'API**

Dans la console du navigateur, testez directement :

```javascript
// Test de base
fetch('https://quiz-zoxq.onrender.com/api')
.then(response => response.json())
.then(data => console.log('API OK:', data))
.catch(error => console.error('Erreur API:', error));

// Test d'inscription
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
.then(data => console.log('Inscription:', data))
.catch(error => console.error('Erreur inscription:', error));
```

### 📋 **2. Vérifier les Variables d'Environnement**

Sur Render, vérifier que ces variables sont configurées :
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
JWT_SECRET=votre_secret_jwt_tres_securise_ici
NODE_ENV=production
```

### 📋 **3. Test en Mode Développement**

Si le problème persiste en production, tester en local :

```bash
# Terminal 1 : Backend local
cd backend
npm start

# Terminal 2 : Frontend local
cd frontend
npm run dev
```

Puis tester l'inscription dans le navigateur.

## 🔧 **Solutions**

### ✅ **Solution 1 : Configuration CORS Plus Permissive**

Modifier `backend/server.js` pour être plus permissif :

```javascript
// Configuration CORS plus permissive
app.use(cors({
  origin: true, // Autoriser toutes les origines
  credentials: true
}));
```

### ✅ **Solution 2 : Vérifier l'URL de l'API**

Dans `frontend/src/services/api.ts`, vérifier :

```typescript
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api'  // Développement local
  : 'https://quiz-zoxq.onrender.com/api';  // Production (Render)
```

### ✅ **Solution 3 : Test avec curl**

Tester directement avec curl :

```bash
# Test d'inscription
curl -X POST https://quiz-zoxq.onrender.com/api/auth/register \
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
curl -X POST https://quiz-zoxq.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@test.com",
  "password": "test123"
}'
```

## 🚨 **Problèmes Courants**

### ❌ **Erreur CORS**
- **Symptôme** : "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
- **Solution** : Configuration CORS plus permissive

### ❌ **Erreur MongoDB**
- **Symptôme** : Erreur dans les logs du backend
- **Solution** : Vérifier la connexion MongoDB Atlas

### ❌ **Erreur de Connexion**
- **Symptôme** : "Failed to fetch" sans détails
- **Solution** : Vérifier que le backend est démarré

## 🎯 **Solution Alternative : Railway**

Si Render continue à poser problème :

1. **Aller sur** https://railway.app
2. **"New Project"** → "Deploy from GitHub repo"
3. **Sélectionner votre repo** QUIZ
4. **Railway détectera automatiquement** le backend
5. **Ajouter les variables** d'environnement
6. **Mettre à jour l'URL** dans le frontend

## 🎯 **Test Final**

Une fois les corrections appliquées :

1. **Redéployer le backend** sur Render
2. **Tester l'API** directement dans la console
3. **Tester le frontend** en local
4. **Vérifier que l'inscription** fonctionne

## 🆘 **Support**

Si le problème persiste :

1. **Vérifier les logs** sur Render
2. **Tester l'API** directement avec curl ou Postman
3. **Vérifier la console** du navigateur pour les erreurs détaillées
4. **Utiliser Railway** comme alternative

La configuration CORS plus permissive devrait résoudre définitivement le problème "Failed to fetch" ! 🚀 