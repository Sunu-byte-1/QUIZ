# 🔍 Vérification des Logs Render

## 📋 **Étapes pour Vérifier les Logs**

### **1. Accéder aux Logs**
1. **Aller sur** https://dashboard.render.com
2. **Sélectionner votre service** quiz-backend
3. **Cliquer sur** "Logs" (onglet en haut)

### **2. Vérifier les Erreurs**
Cherchez dans les logs :
- ❌ **Erreurs MongoDB** : `MongoNetworkError`, `MongoParseError`
- ❌ **Erreurs de variables** : `MONGO_URI is not defined`
- ❌ **Erreurs de port** : `EADDRINUSE`, `Port already in use`
- ❌ **Erreurs de modules** : `Cannot find module`

### **3. Logs Normaux (✅)**
```
Listening on port 5000
Connected to MongoDB
Server is running
```

### **4. Logs d'Erreur (❌)**
```
Error: MONGO_URI is not defined
MongoNetworkError: connect ECONNREFUSED
Error: Cannot find module 'express'
```

## 🚨 **Solutions selon les Erreurs**

### **Si Erreur MONGO_URI :**
1. **Aller dans** "Environment" (onglet)
2. **Ajouter** la variable `MONGO_URI`
3. **Valeur** : `mongodb+srv://username:password@cluster.mongodb.net/quiz-app`

### **Si Erreur JWT_SECRET :**
1. **Aller dans** "Environment" (onglet)
2. **Ajouter** la variable `JWT_SECRET`
3. **Valeur** : `votre_secret_jwt_tres_securise_ici`

### **Si Erreur MongoDB :**
1. **Vérifier** que votre cluster MongoDB Atlas est actif
2. **Vérifier** que l'IP `0.0.0.0/0` est autorisée
3. **Vérifier** que l'utilisateur a les bonnes permissions

### **Si Erreur de Modules :**
1. **Cliquer sur** "Manual Deploy"
2. **Attendre** que le build soit terminé

## 🎯 **Test Rapide après Correction**

Une fois les erreurs corrigées :

```javascript
// Dans la console du navigateur
fetch('https://quiz-zoxq.onrender.com/api')
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => console.log('✅ Backend OK:', data))
.catch(error => console.error('❌ Erreur Backend:', error));
```

## 📊 **Status Render**

- **"Deployed"** = Déployé mais peut-être pas démarré
- **"Live"** = Fonctionnel et accessible
- **"Failed"** = Erreur de déploiement
- **"Building"** = En cours de construction

**Action :** Vérifiez les logs et partagez-moi les erreurs que vous voyez ! 🔍 