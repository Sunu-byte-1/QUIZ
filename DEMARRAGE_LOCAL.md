# 🚀 Démarrage Local - Backend + Frontend

## 🎯 **Problème Identifié**

Vous testez en local mais le frontend essaie de se connecter au backend déployé sur Render. Cela peut causer des erreurs CORS et de connexion.

## ✅ **Solution : Backend Local**

### **1. Démarrer le Backend Local**

```bash
# Dans un terminal, aller dans le dossier backend
cd backend

# Installer les dépendances (si pas déjà fait)
npm install

# Démarrer le serveur local
npm start
```

**Résultat attendu :**
```
✅ Server running on port 5000
✅ Connected to MongoDB
✅ Admin par défaut créé: abdallahdiouf.dev@gmail.com / Khoudia1970admin
```

### **2. Démarrer le Frontend Local**

```bash
# Dans un autre terminal, aller dans le dossier racine
cd C:\Users\abash\Desktop\QUIZ

# Installer les dépendances (si pas déjà fait)
npm install

# Démarrer le serveur de développement
npm run dev
```

**Résultat attendu :**
```
🌐 API URL: http://localhost:5000/api (LOCAL)
✅ Vite dev server running on http://localhost:5173
```

## 🔧 **Configuration Automatique**

Le frontend détecte automatiquement l'environnement :
- **En développement** (`npm run dev`) : `http://localhost:5000/api`
- **En production** (déployé) : `https://quiz-zoxq.onrender.com/api`

## 🎯 **Test Local**

### **1. Vérifier les Services**
- **Backend** : http://localhost:5000/api
- **Frontend** : http://localhost:5173

### **2. Test de Connexion Admin**
1. **Aller sur** http://localhost:5173
2. **Cliquer sur** "Connexion"
3. **Entrer** :
   - Email : `abdallahdiouf.dev@gmail.com`
   - Mot de passe : `Khoudia1970admin`
4. **Se connecter**

### **3. Vérifier la Console**
Dans la console du navigateur, vous devriez voir :
```
🌐 API URL: http://localhost:5000/api (LOCAL)
```

## 🚨 **Si le Backend Local Ne Démarre Pas**

### **Vérifier les Variables d'Environnement**
Créer un fichier `.env` dans le dossier `backend` :

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
JWT_SECRET=votre_secret_jwt_tres_securise_ici
NODE_ENV=development
PORT=5000
```

### **Vérifier MongoDB**
- **MongoDB Atlas** : Cluster actif et accessible
- **IP autorisée** : `0.0.0.0/0` ou votre IP locale
- **Utilisateur** : Permissions de lecture/écriture

### **Vérifier les Ports**
- **Port 5000** : Disponible pour le backend
- **Port 5173** : Disponible pour le frontend

## 🎯 **Avantages du Test Local**

- ✅ **Pas de CORS** : Même origine
- ✅ **Développement rapide** : Pas de déploiement
- ✅ **Debug facile** : Logs en temps réel
- ✅ **Tests instantanés** : Modifications immédiates

## 🔄 **Basculement Automatique**

Le système détecte automatiquement :
- **`npm run dev`** → Backend local
- **Déploiement** → Backend Render

**Démarrez maintenant le backend local pour tester sans erreurs !** 🚀 