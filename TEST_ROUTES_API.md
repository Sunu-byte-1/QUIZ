# 🧪 Test des Routes API

## ✅ **Routes Disponibles**

Après la mise à jour, voici les routes disponibles :

### 📋 **1. Route de Base**
- **GET** `/` → "API Quiz backend opérationnelle"
- **GET** `/api` → Informations sur l'API et les endpoints

### 📋 **2. Routes d'Authentification**
- **POST** `/api/auth/register` → Inscription
- **POST** `/api/auth/login` → Connexion
- **GET** `/api/auth/users` → Liste des utilisateurs (protégée)
- **GET** `/api/auth/me` → Informations utilisateur (protégée)

## 🎯 **Tests de Base**

### 📋 **1. Test de la Route Racine**

```bash
curl https://quiz-zoxq.onrender.com/
# Réponse attendue : "API Quiz backend opérationnelle"
```

### 📋 **2. Test de la Route /api**

```bash
curl https://quiz-zoxq.onrender.com/api
# Réponse attendue : JSON avec les informations de l'API
```

### 📋 **3. Test d'Inscription**

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

### 📋 **4. Test de Connexion**

```bash
curl -X POST https://quiz-zoxq.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@test.com",
  "password": "test123"
}'
```

## 🎯 **Tests dans le Navigateur**

### 📋 **1. Test de la Route /api**

```javascript
// Dans la console du navigateur
fetch('https://quiz-zoxq.onrender.com/api')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
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
.then(data => console.log('Réponse:', data))
.catch(error => console.error('Erreur:', error));
```

### 📋 **3. Test de Connexion**

```javascript
// Dans la console du navigateur
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
  console.log('Token:', data.token);
  console.log('Email:', data.email);
})
.catch(error => console.error(error));
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
3. **Remplir le formulaire** d'inscription
4. **Vérifier** que l'inscription fonctionne

### 📋 **3. Tester la Connexion**

1. **Utiliser** l'email et mot de passe créés
2. **Cliquer sur** "Se connecter"
3. **Vérifier** que la connexion fonctionne

## 🚨 **Problèmes Courants**

### ❌ **Erreur 404 sur /api**
- **Cause** : Route `/api` non configurée
- **Solution** : Route ajoutée dans `server.js`

### ❌ **Erreur CORS**
- **Cause** : Configuration CORS incorrecte
- **Solution** : Configuration CORS mise à jour

### ❌ **Erreur MongoDB**
- **Cause** : Connexion MongoDB échouée
- **Solution** : Vérifier les variables d'environnement

## 🎉 **Résultats Attendus**

### ✅ **Route /api**
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

## 🆘 **Support**

Si vous rencontrez encore des problèmes :

1. **Vérifier les logs** sur Render
2. **Tester les routes** directement avec curl
3. **Vérifier la console** du navigateur
4. **Redéployer** le backend si nécessaire

Les routes devraient maintenant fonctionner correctement ! 🚀 