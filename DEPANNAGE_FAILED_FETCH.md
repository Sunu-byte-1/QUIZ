# 🚨 Dépannage - Erreur "Failed to fetch"

## ❌ **Problème Identifié**

L'erreur "Failed to fetch" lors de l'inscription indique un problème de connexion entre le frontend et le backend.

## 🔧 **Solutions**

### ✅ **Solution 1 : Vérifier l'URL de l'API**

Dans `frontend/src/services/api.ts`, vérifier que l'URL est correcte :

```typescript
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api'  // Développement local
  : 'https://quiz-zoxq.onrender.com/api';  // Production (Render)
```

### ✅ **Solution 2 : Test Direct de l'API**

Tester directement l'API dans la console du navigateur :

```javascript
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
.then(data => console.log('Réponse:', data))
.catch(error => console.error('Erreur:', error));
```

### ✅ **Solution 3 : Configuration CORS Améliorée**

Le backend a été mis à jour avec une configuration CORS plus spécifique. Redéployer le backend :

1. **Pousser les changements** vers GitHub
2. **Redéployer** sur Render
3. **Attendre** que le déploiement soit terminé

### ✅ **Solution 4 : Test en Mode Développement**

Tester avec le backend local :

```bash
# Terminal 1 : Backend local
cd backend
npm start

# Terminal 2 : Frontend local
cd frontend
npm run dev
```

Puis tester l'inscription dans le navigateur.

## 🔍 **Diagnostic**

### 📋 **1. Vérifier la Console du Navigateur**

Ouvrir les outils de développement (F12) et vérifier :
- **Onglet Console** : Messages d'erreur détaillés
- **Onglet Network** : Requêtes HTTP et réponses

### 📋 **2. Vérifier le Statut du Backend**

```bash
curl https://quiz-zoxq.onrender.com/
# Réponse attendue : "API Quiz backend opérationnelle"
```

### 📋 **3. Vérifier les Variables d'Environnement**

Sur Render, vérifier que les variables sont configurées :
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
JWT_SECRET=votre_secret_jwt_tres_securise_ici
NODE_ENV=production
```

## 🚨 **Problèmes Courants**

### ❌ **Erreur CORS**
- **Symptôme** : "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
- **Solution** : Configuration CORS mise à jour dans le backend

### ❌ **Erreur 404**
- **Symptôme** : "Failed to fetch" avec statut 404
- **Solution** : Vérifier l'URL de l'API

### ❌ **Erreur de Connexion**
- **Symptôme** : "Failed to fetch" sans détails
- **Solution** : Vérifier que le backend est démarré

### ❌ **Erreur MongoDB**
- **Symptôme** : Erreur dans les logs du backend
- **Solution** : Vérifier la connexion MongoDB Atlas

## 🎯 **Test Rapide**

### 📋 **1. Test de Base**

```bash
curl https://quiz-zoxq.onrender.com/
```

### 📋 **2. Test d'Inscription**

```bash
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
```

### 📋 **3. Test dans le Navigateur**

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
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

## 🎯 **Solution Alternative : Mode Développement**

Si le problème persiste en production, tester en mode développement :

1. **Démarrer le backend local** :
   ```bash
   cd backend
   npm start
   ```

2. **Démarrer le frontend local** :
   ```bash
   cd frontend
   npm run dev
   ```

3. **Tester l'inscription** dans le navigateur

## 🆘 **Support Supplémentaire**

Si le problème persiste :

1. **Vérifier les logs** sur Render
2. **Tester l'API** directement avec curl ou Postman
3. **Vérifier la console** du navigateur pour les erreurs détaillées
4. **Redéployer** le backend avec la nouvelle configuration CORS

La configuration CORS mise à jour devrait résoudre le problème "Failed to fetch" ! 🚀 