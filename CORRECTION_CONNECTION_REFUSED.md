# 🔧 Correction ERR_CONNECTION_REFUSED

## ❌ **Problème Identifié**

L'erreur `ERR_CONNECTION_REFUSED` indique que le frontend essaie de se connecter à `localhost:5000` au lieu du backend déployé sur Render.

## ✅ **Correction Appliquée**

L'URL de l'API a été modifiée pour forcer l'utilisation du backend déployé :
```typescript
const API_BASE_URL = 'https://quiz-zoxq.onrender.com/api';
```

## 🎯 **Actions Immédiates**

### 📋 **1. Redémarrer le Frontend**

```bash
# Arrêter le serveur frontend (Ctrl+C)
# Puis redémarrer
cd frontend
npm run dev
```

### 📋 **2. Vérifier la Connexion**

Ouvrir la console du navigateur (F12) et tester :

```javascript
// Test de base
fetch('https://quiz-zoxq.onrender.com/api')
.then(response => response.json())
.then(data => console.log('✅ API OK:', data))
.catch(error => console.error('❌ Erreur API:', error));
```

### 📋 **3. Tester l'Inscription**

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
.then(data => console.log('✅ Inscription:', data))
.catch(error => console.error('❌ Erreur inscription:', error));
```

## 🎯 **Test du Frontend**

### 📋 **1. Ouvrir l'Application**

1. **Aller sur** http://localhost:5173
2. **Vérifier** qu'il n'y a plus d'erreurs dans la console
3. **Tester l'inscription** dans l'interface

### 📋 **2. Tester l'Inscription**

1. **Cliquer sur** "Pas de compte ? S'inscrire"
2. **Remplir le formulaire** :
   - Email : `test@test.com`
   - Mot de passe : `test123`
   - Prénom : `Test`
   - Nom : `User`
   - Pays : `Sénégal`
   - Âge : `25`
3. **Cliquer sur** "S'inscrire"

### 📋 **3. Vérifier le Résultat**

- ✅ Pas d'erreur "ERR_CONNECTION_REFUSED"
- ✅ Pas d'erreur "Failed to fetch"
- ✅ Message de succès d'inscription
- ✅ Redirection vers la connexion

## 🎉 **Résultats Attendus**

### ✅ **Console Propre**
- Pas d'erreurs `ERR_CONNECTION_REFUSED`
- Pas d'erreurs `Failed to fetch`
- Connexion API réussie

### ✅ **Inscription Fonctionnelle**
```json
{
  "message": "Inscription réussie"
}
```

### ✅ **Connexion Fonctionnelle**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "test@test.com"
}
```

## 🚨 **Si Problème Persiste**

### ❌ **Option 1 : Vérifier le Backend**

Tester directement le backend :
```bash
curl https://quiz-zoxq.onrender.com/api
```

### ❌ **Option 2 : Test en Local**

Si le problème persiste, tester en local :
```bash
# Terminal 1 : Backend local
cd backend
npm start

# Terminal 2 : Frontend local
cd frontend
npm run dev
```

### ❌ **Option 3 : Railway**

Si Render pose problème :
1. **Aller sur** https://railway.app
2. **"New Project"** → "Deploy from GitHub repo"
3. **Sélectionner votre repo** QUIZ
4. **Mettre à jour l'URL** dans `api.ts`

## 🎯 **Prochaines Étapes**

Une fois l'inscription fonctionnelle :

1. **Tester la connexion**
2. **Tester les jeux** (Quiz, Douze Coups de Midi, Génie en Herbe)
3. **Vérifier le profil utilisateur**
4. **Déployer le frontend** (optionnel)

## 🆘 **Support**

Si vous rencontrez encore des problèmes :

1. **Vérifier les logs** sur Render
2. **Tester l'API** directement avec curl
3. **Vérifier la console** du navigateur
4. **Utiliser Railway** comme alternative

La correction de l'URL devrait résoudre définitivement l'erreur `ERR_CONNECTION_REFUSED` ! 🚀 