# 🧪 Test Rapide API - Après Correction CORS

## ✅ **Correction Appliquée**

La configuration CORS a été modifiée pour être plus permissive et résoudre le problème "Failed to fetch".

## 🎯 **Test Immédiat**

### 📋 **1. Test de Base (Console Navigateur)**

Ouvrir la console du navigateur (F12) et tester :

```javascript
// Test de base
fetch('https://quiz-zoxq.onrender.com/api')
.then(response => response.json())
.then(data => console.log('✅ API OK:', data))
.catch(error => console.error('❌ Erreur API:', error));
```

### 📋 **2. Test d'Inscription (Console Navigateur)**

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
.then(data => console.log('✅ Inscription:', data))
.catch(error => console.error('❌ Erreur inscription:', error));
```

### 📋 **3. Test de Connexion (Console Navigateur)**

```javascript
// Test de connexion
fetch('https://quiz-zoxq.onrender.com/api/auth/login', {
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
.then(data => {
  console.log('✅ Token:', data.token);
  console.log('✅ Email:', data.email);
})
.catch(error => console.error('❌ Erreur connexion:', error));
```

## 🎯 **Test du Frontend**

### 📋 **1. Démarrer le Frontend**

```bash
cd frontend
npm run dev
```

### 📋 **2. Tester l'Inscription**

1. **Ouvrir** http://localhost:5173
2. **Cliquer sur** "Pas de compte ? S'inscrire"
3. **Remplir le formulaire** :
   - Email : `test@test.com`
   - Mot de passe : `test123`
   - Prénom : `Test`
   - Nom : `User`
   - Pays : `Sénégal`
   - Âge : `25`
4. **Cliquer sur** "S'inscrire"

### 📋 **3. Vérifier le Résultat**

- ✅ Pas d'erreur "Failed to fetch"
- ✅ Message de succès d'inscription
- ✅ Redirection vers la connexion

## 🎉 **Résultats Attendus**

### ✅ **Test API Réussi**
```json
{
  "message": "API Quiz backend opérationnelle",
  "endpoints": {
    "auth": "/api/auth",
    "register": "/api/auth/register",
    "login": "/api/auth/login",
    "users": "/api/auth/users",
    "me": "/api/auth/me"
  }
}
```

### ✅ **Inscription Réussie**
```json
{
  "message": "Inscription réussie"
}
```

### ✅ **Connexion Réussie**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "test@test.com"
}
```

## 🚨 **Si Problème Persiste**

### ❌ **Option 1 : Test en Local**
```bash
# Terminal 1 : Backend local
cd backend
npm start

# Terminal 2 : Frontend local
cd frontend
npm run dev
```

### ❌ **Option 2 : Railway**
1. **Aller sur** https://railway.app
2. **"New Project"** → "Deploy from GitHub repo"
3. **Sélectionner votre repo** QUIZ
4. **Railway détectera automatiquement** le backend

## 🎯 **Prochaines Étapes**

Une fois l'inscription fonctionnelle :

1. **Tester la connexion**
2. **Tester les jeux**
3. **Vérifier le profil utilisateur**
4. **Déployer le frontend** (optionnel)

La configuration CORS plus permissive devrait résoudre définitivement le problème ! 🚀 