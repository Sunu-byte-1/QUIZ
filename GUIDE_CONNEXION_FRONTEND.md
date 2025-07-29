# 🔗 Guide de Connexion Frontend-Backend

## ✅ **Configuration Automatique**

Le frontend est maintenant configuré pour :
- **Développement local** : `http://localhost:5000/api`
- **Production Render** : `https://quiz-backend.onrender.com/api`
- **Production Railway** : `https://quiz-backend-production.up.railway.app/api`

## 🎯 **Étapes de Test**

### 📋 **1. Tester en Développement Local**

```bash
# Terminal 1 : Backend local
cd backend
npm start

# Terminal 2 : Frontend local
cd frontend
npm run dev
```

### 📋 **2. Tester avec le Backend Déployé**

```bash
# Frontend local avec backend déployé
cd frontend
npm run dev
```

## 🧪 **Tests de Connexion**

### ✅ **Test d'Inscription**

```javascript
// Dans la console du navigateur
fetch('https://quiz-backend.onrender.com/api/auth/register', {
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
.then(data => console.log(data));
```

### ✅ **Test de Connexion**

```javascript
// Dans la console du navigateur
fetch('https://quiz-backend.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'test@test.com',
    password: 'test123'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔧 **Configuration Avancée**

### 📁 **Variables d'Environnement Frontend**

Créer un fichier `.env` dans `frontend/` :

```env
# Développement
VITE_API_URL=http://localhost:5000/api

# Production Render
VITE_API_URL=https://quiz-backend.onrender.com/api

# Production Railway
VITE_API_URL=https://quiz-backend-production.up.railway.app/api
```

### 🔄 **Mise à Jour du Code**

Si vous voulez utiliser les variables d'environnement :

```typescript
// Dans frontend/src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## 🚨 **Problèmes Courants**

### ❌ **Erreur CORS**
- **Cause** : Le backend n'autorise pas les requêtes du frontend
- **Solution** : Vérifier que CORS est configuré dans `backend/server.js`

### ❌ **Erreur 404**
- **Cause** : L'URL de l'API est incorrecte
- **Solution** : Vérifier l'URL du backend déployé

### ❌ **Erreur de Connexion**
- **Cause** : Le backend n'est pas démarré ou déployé
- **Solution** : Vérifier le statut du déploiement

## 🎯 **Déploiement du Frontend**

### 📋 **Option 1 : Vercel (Recommandé)**

1. **Aller sur** https://vercel.com
2. **"New Project"** → Connecter le repo GitHub
3. **Configuration automatique** :
   - Framework Preset : Vite
   - Root Directory : frontend
   - Build Command : `npm run build`
   - Output Directory : dist

### 📋 **Option 2 : Netlify**

1. **Aller sur** https://netlify.com
2. **"New site from Git"**
3. **Configuration** :
   - Build command : `npm run build`
   - Publish directory : `dist`

### 📋 **Option 3 : GitHub Pages**

1. **Dans le repo GitHub** :
   - Settings → Pages
   - Source : GitHub Actions
   - Créer un workflow GitHub Actions

## 🎉 **Test Final**

Une fois le frontend déployé :

1. **Ouvrir l'application** dans le navigateur
2. **Tester l'inscription** avec un nouvel utilisateur
3. **Tester la connexion** avec l'utilisateur créé
4. **Vérifier que les données** sont sauvegardées

## 📋 **Checklist de Connexion**

- [ ] Backend déployé et accessible
- [ ] URL de l'API mise à jour dans le frontend
- [ ] Test d'inscription réussi
- [ ] Test de connexion réussi
- [ ] Frontend déployé (optionnel)
- [ ] Application complète testée

## 🆘 **Support**

Si vous rencontrez des problèmes :

1. **Vérifier les logs** du backend déployé
2. **Tester l'API** directement avec curl ou Postman
3. **Vérifier la console** du navigateur pour les erreurs
4. **Tester en local** d'abord

La connexion frontend-backend devrait maintenant fonctionner ! 🚀 