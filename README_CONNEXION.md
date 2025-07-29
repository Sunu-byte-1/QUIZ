# Guide de Connexion Frontend-Backend

## Configuration Backend

1. **Installer les dépendances du backend :**
   ```bash
   cd backend
   npm install
   ```

2. **Créer le fichier .env dans le dossier backend :**
   ```
   MONGO_URI=mongodb://localhost:27017/quiz-app
   JWT_SECRET=votre_secret_jwt_tres_securise_ici
   PORT=5000
   ```

3. **Démarrer MongoDB :**
   - Assurez-vous que MongoDB est installé et en cours d'exécution
   - Ou utilisez MongoDB Atlas (service cloud)

4. **Démarrer le serveur backend :**
   ```bash
   cd backend
   npm run dev
   ```
   Le serveur sera accessible sur http://localhost:5000

## Configuration Frontend

1. **Installer les dépendances du frontend :**
   ```bash
   cd frontend
   npm install
   ```

2. **Démarrer le serveur de développement :**
   ```bash
   cd frontend
   npm run dev
   ```
   L'application sera accessible sur http://localhost:5173

## Fonctionnalités Implémentées

### Authentification
- **Inscription :** Créer un nouveau compte avec email et mot de passe
- **Connexion :** Se connecter avec email et mot de passe existant
- **Déconnexion :** Se déconnecter et effacer le token

### API Endpoints
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/users` - Liste des utilisateurs (debug)

### Sécurité
- Mots de passe hashés avec bcrypt
- Tokens JWT pour l'authentification
- CORS configuré pour permettre les requêtes frontend

## Utilisation

1. Ouvrez l'application dans votre navigateur
2. Cliquez sur "Pas de compte ? S'inscrire" pour créer un compte
3. Ou connectez-vous avec un compte existant
4. Une fois connecté, vous accédez aux différents modes de quiz

## Dépannage

- **Erreur de connexion MongoDB :** Vérifiez que MongoDB est démarré
- **Erreur CORS :** Vérifiez que le backend est sur le port 5000
- **Erreur de token :** Vérifiez que JWT_SECRET est défini dans .env 