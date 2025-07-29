# 🚨 Diagnostic Backend - Problème CORS

## ❌ **Problème Identifié**

Les requêtes fetch restent "Pending", ce qui indique que le backend ne répond pas.

## 🔍 **Diagnostic**

### 📋 **1. Test du Backend**

```bash
# Test de base
curl https://quiz-zoxq.onrender.com/

# Test de l'API
curl https://quiz-zoxq.onrender.com/api

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
```

### 📋 **2. Vérifier les Variables d'Environnement sur Render**

1. **Aller sur** https://dashboard.render.com
2. **Sélectionner votre service** quiz-backend
3. **Onglet "Environment"**
4. **Vérifier** que ces variables sont configurées :
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
   JWT_SECRET=votre_secret_jwt_tres_securise_ici
   NODE_ENV=production
   ```

### 📋 **3. Vérifier les Logs sur Render**

1. **Aller sur** https://dashboard.render.com
2. **Sélectionner votre service** quiz-backend
3. **Onglet "Logs"**
4. **Vérifier** s'il y a des erreurs

## 🔧 **Solutions**

### ✅ **Solution 1 : Redémarrer le Backend**

1. **Aller sur** https://dashboard.render.com
2. **Sélectionner votre service** quiz-backend
3. **Cliquer sur** "Manual Deploy"
4. **Attendre** que le déploiement soit terminé

### ✅ **Solution 2 : Vérifier MongoDB Atlas**

1. **Aller sur** https://cloud.mongodb.com
2. **Vérifier** que votre cluster est actif
3. **Vérifier** que l'IP 0.0.0.0/0 est autorisée
4. **Vérifier** que l'utilisateur a les bonnes permissions

### ✅ **Solution 3 : Test en Local**

Si le backend déployé ne fonctionne pas :

```bash
# Terminal 1 : Backend local
cd backend
npm start

# Terminal 2 : Frontend local
npm run dev
```

Puis tester l'inscription dans le navigateur.

### ✅ **Solution 4 : Alternative Railway**

Si Render continue à poser problème :

1. **Aller sur** https://railway.app
2. **"New Project"** → "Deploy from GitHub repo"
3. **Sélectionner votre repo** QUIZ
4. **Railway détectera automatiquement** le backend
5. **Ajouter les variables** d'environnement

## 🎯 **Test Rapide**

### 📋 **1. Test du Backend**

```javascript
// Dans la console du navigateur
fetch('https://quiz-zoxq.onrender.com/api')
.then(response => response.json())
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
.then(response => response.json())
.then(data => console.log('✅ Inscription:', data))
.catch(error => console.error('❌ Erreur inscription:', error));
```

## 🚨 **Si Problème Persiste**

### ❌ **Option 1 : Backend Local**
```bash
cd backend
npm start
```

Puis modifier temporairement l'URL dans `src/services/api.ts` :
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

### ❌ **Option 2 : Railway**
1. **Aller sur** https://railway.app
2. **"New Project"** → "Deploy from GitHub repo"
3. **Sélectionner votre repo** QUIZ
4. **Mettre à jour l'URL** dans `src/services/api.ts`

## 🆘 **Support**

Si le problème persiste :

1. **Vérifier les logs** sur Render
2. **Tester le backend** localement
3. **Vérifier MongoDB Atlas**
4. **Utiliser Railway** comme alternative

Le redémarrage du backend devrait résoudre le problème ! 🚀 