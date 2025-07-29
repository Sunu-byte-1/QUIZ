# 🚀 Guide Déploiement Vercel - Frontend

## ❌ **Problème Identifié**

L'erreur `vite: command not found` indique que Vercel essaie de déployer depuis la racine au lieu du dossier `frontend`.

## ✅ **Solution Appliquée**

Un fichier `vercel.json` a été créé pour spécifier le bon dossier et les commandes de build.

## 🎯 **Configuration Vercel**

### 📋 **1. Fichier vercel.json**

Le fichier `vercel.json` à la racine configure :
- **Build Command** : `cd frontend && npm install && npm run build`
- **Output Directory** : `frontend/dist`
- **Install Command** : `cd frontend && npm install`
- **Framework** : `vite`

### 📋 **2. Redéployer sur Vercel**

1. **Aller sur** https://vercel.com
2. **Sélectionner votre projet** QUIZ
3. **Cliquer sur** "Redeploy" ou "Deploy"
4. **Attendre** que le déploiement soit terminé

## 🎯 **Configuration Alternative**

### 📋 **Option 1 : Configuration Manuelle Vercel**

Si le fichier `vercel.json` ne fonctionne pas :

1. **Aller sur** https://vercel.com
2. **Sélectionner votre projet** QUIZ
3. **Settings** → **General**
4. **Configuration** :
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

### 📋 **Option 2 : Repository Séparé**

Si le problème persiste, créer un repository séparé pour le frontend :

1. **Créer un nouveau repo** sur GitHub
2. **Copier seulement le dossier frontend**
3. **Déployer le nouveau repo** sur Vercel

## 🧪 **Test du Déploiement**

### 📋 **1. Vérifier le Déploiement**

Une fois déployé, vérifier :
- ✅ Site accessible sans erreur
- ✅ Interface de connexion/inscription visible
- ✅ Pas d'erreurs dans la console

### 📋 **2. Tester l'Inscription**

1. **Ouvrir** l'URL Vercel
2. **Cliquer sur** "Pas de compte ? S'inscrire"
3. **Remplir le formulaire** :
   - Email : `test@test.com`
   - Mot de passe : `test123`
   - Prénom : `Test`
   - Nom : `User`
   - Pays : `Sénégal`
   - Âge : `25`
4. **Cliquer sur** "S'inscrire"

### 📋 **3. Vérifier la Connexion**

1. **Utiliser** l'email et mot de passe créés
2. **Cliquer sur** "Se connecter"
3. **Vérifier** que la connexion fonctionne

## 🎉 **Résultats Attendus**

### ✅ **Déploiement Réussi**
- ✅ Build sans erreur
- ✅ Site accessible
- ✅ Interface fonctionnelle

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

## 🚨 **Problèmes Courants**

### ❌ **Erreur : "vite: command not found"**
- **Cause** : Vercel ne trouve pas le dossier frontend
- **Solution** : Configuration `vercel.json` ou Root Directory

### ❌ **Erreur : "Build failed"**
- **Cause** : Dépendances manquantes
- **Solution** : Vérifier `package.json` et `npm install`

### ❌ **Erreur : "Failed to fetch"**
- **Cause** : URL de l'API incorrecte
- **Solution** : Vérifier `frontend/src/services/api.ts`

## 🎯 **Prochaines Étapes**

Une fois le frontend déployé :

1. **Tester l'inscription** et la connexion
2. **Tester les jeux** (Quiz, Douze Coups de Midi, Génie en Herbe)
3. **Vérifier le profil utilisateur**
4. **Partager l'URL** de l'application

## 🆘 **Support**

Si vous rencontrez des problèmes :

1. **Vérifier les logs** sur Vercel
2. **Tester localement** d'abord
3. **Vérifier la configuration** `vercel.json`
4. **Utiliser un repository séparé** si nécessaire

Le fichier `vercel.json` devrait résoudre le problème de déploiement ! 🚀 