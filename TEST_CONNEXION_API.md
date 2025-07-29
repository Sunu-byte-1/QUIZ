# 🧪 Test de Connexion API

## ✅ **Backend Déployé**

Votre backend est maintenant accessible sur : [https://quiz-zoxq.onrender.com](https://quiz-zoxq.onrender.com)

## 🎯 **Tests de l'API**

### 📋 **1. Test de Base**

```bash
curl https://quiz-zoxq.onrender.com/
# Réponse attendue : "API Quiz backend opérationnelle"
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

### 📋 **3. Test de Connexion**

```bash
curl -X POST https://quiz-zoxq.onrender.com/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@test.com",
  "password": "test123"
}'
```

## 🎯 **Test du Frontend**

### 📋 **1. Démarrer le Frontend Local**

```bash
cd frontend
npm run dev
```

### 📋 **2. Tester dans le Navigateur**

1. **Ouvrir** http://localhost:5173
2. **Tester l'inscription** avec un nouvel utilisateur
3. **Tester la connexion** avec l'utilisateur créé
4. **Vérifier que les données** sont sauvegardées

### 📋 **3. Test dans la Console du Navigateur**

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
.then(response => response.json())
.then(data => console.log(data));

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
.then(data => console.log(data));
```

## 🔧 **Configuration Variables d'Environnement**

Si vous voulez utiliser des variables d'environnement, créer un fichier `.env` dans `frontend/` :

```env
# Développement
VITE_API_URL=http://localhost:5000/api

# Production
VITE_API_URL=https://quiz-zoxq.onrender.com/api
```

## 🎉 **Résultats Attendus**

### ✅ **Inscription Réussie**
```json
{
  "message": "Utilisateur créé avec succès"
}
```

### ✅ **Connexion Réussie**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "test@test.com",
  "prenom": "Test",
  "nom": "User",
  "pays": "Sénégal",
  "age": 25
}
```

## 🚨 **Problèmes Courants**

### ❌ **Erreur CORS**
- **Cause** : Le backend n'autorise pas les requêtes du frontend
- **Solution** : Vérifier que CORS est configuré dans `backend/server.js`

### ❌ **Erreur 404**
- **Cause** : L'URL de l'API est incorrecte
- **Solution** : Vérifier l'URL : `https://quiz-zoxq.onrender.com/api`

### ❌ **Erreur de Connexion**
- **Cause** : Le backend n'est pas démarré
- **Solution** : Vérifier le statut sur Render

## 🎯 **Prochaines Étapes**

1. **Tester l'inscription** dans l'application
2. **Tester la connexion** dans l'application
3. **Vérifier que les données** sont sauvegardées
4. **Déployer le frontend** (optionnel)

La connexion frontend-backend devrait maintenant fonctionner parfaitement ! 🚀 