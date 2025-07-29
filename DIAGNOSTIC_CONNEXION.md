# 🔍 Diagnostic Problème de Connexion

## 🎯 **Problème Identifié**

- ✅ **Inscription** : Fonctionne parfaitement
- ❌ **Connexion** : "Email et mot de passe requis"
- 🔍 **Cause probable** : `req.body` vide ou mal parsé

## 🚨 **Debugging Ajouté**

### **Logs de Debug dans le Backend**
```javascript
// Connexion
router.post('/login', async (req, res) => {
  try {
    console.log('🔍 Debug connexion - req.body:', req.body);
    console.log('🔍 Debug connexion - Content-Type:', req.headers['content-type']);
    
    const { email, password } = req.body;
    console.log('🔍 Debug connexion - email:', email);
    console.log('🔍 Debug connexion - password:', password ? '***' : 'undefined');
```

## 🔧 **Actions de Diagnostic**

### **1. Redéployer avec Debug**
Les logs de debug sont maintenant dans le backend. Redéployez pour voir les logs.

### **2. Test Direct de l'API**
Dans la console du navigateur :
```javascript
// Test de connexion avec debug
fetch('https://quiz-zoxq.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    email: 'abdallahdiouf.dev@gmail.com',
    password: 'Khoudia1970admin'
  })
})
.then(response => {
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  return response.json();
})
.then(data => console.log('✅ Réponse:', data))
.catch(error => console.error('❌ Erreur:', error));
```

### **3. Vérifier les Logs Render**
1. **Aller sur** https://dashboard.render.com
2. **Sélectionner** votre service quiz-backend
3. **Cliquer sur** "Logs"
4. **Chercher** les logs de debug :
   ```
   🔍 Debug connexion - req.body:
   🔍 Debug connexion - Content-Type:
   🔍 Debug connexion - email:
   🔍 Debug connexion - password:
   ```

## 🎯 **Scénarios Possibles**

### **Scénario 1 : req.body vide**
```
🔍 Debug connexion - req.body: {}
🔍 Debug connexion - email: undefined
🔍 Debug connexion - password: undefined
```
**Cause** : Problème de parsing JSON

### **Scénario 2 : Content-Type incorrect**
```
🔍 Debug connexion - Content-Type: text/plain
```
**Cause** : Headers mal configurés

### **Scénario 3 : Données partielles**
```
🔍 Debug connexion - email: abdallahdiouf.dev@gmail.com
🔍 Debug connexion - password: undefined
```
**Cause** : Problème avec le champ password

## ✅ **Solutions selon le Diagnostic**

### **Si req.body vide**
- Vérifier `express.json()` middleware
- Vérifier les headers Content-Type
- Tester avec curl ou Postman

### **Si Content-Type incorrect**
- Forcer `'Content-Type': 'application/json'`
- Vérifier les headers côté frontend

### **Si données partielles**
- Vérifier la structure JSON
- Tester avec des données simples

## 🚀 **Test Immédiat**

### **1. Test avec curl**
```bash
curl -X POST https://quiz-zoxq.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"abdallahdiouf.dev@gmail.com","password":"Khoudia1970admin"}'
```

### **2. Test avec Postman**
- **Method** : POST
- **URL** : `https://quiz-zoxq.onrender.com/api/auth/login`
- **Headers** : `Content-Type: application/json`
- **Body** : `{"email":"abdallahdiouf.dev@gmail.com","password":"Khoudia1970admin"}`

## 🎯 **Prochaines Étapes**

1. **Redéployer** le backend avec debug
2. **Tester** la connexion
3. **Vérifier** les logs Render
4. **Identifier** le problème exact
5. **Corriger** selon le diagnostic

**Redéployez et partagez-moi les logs de debug !** 🔍 