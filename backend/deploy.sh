#!/bin/bash

echo "🚀 Déploiement du Backend Quiz"
echo "================================"

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "✅ Dépendances installées"

# Vérifier que le fichier .env existe
if [ ! -f .env ]; then
    echo "⚠️  Fichier .env non trouvé"
    echo "📝 Création d'un fichier .env d'exemple..."
    cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/quiz-app
JWT_SECRET=votre_secret_jwt_tres_securise_ici
PORT=5000
NODE_ENV=development
EOF
    echo "✅ Fichier .env créé"
    echo "⚠️  Veuillez modifier le fichier .env avec vos vraies valeurs"
fi

# Tester le serveur localement
echo "🧪 Test du serveur local..."
timeout 5s npm start &
SERVER_PID=$!

sleep 3

if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Serveur local fonctionne"
    kill $SERVER_PID
else
    echo "❌ Erreur lors du démarrage du serveur local"
    exit 1
fi

echo ""
echo "🎯 Options de déploiement :"
echo "1. Render (Recommandé - Gratuit)"
echo "2. Railway (Simple et rapide)"
echo "3. Heroku (Classique)"
echo "4. Vercel (Pour API)"
echo "5. Déploiement manuel"
echo ""

read -p "Choisissez une option (1-5) : " choice

case $choice in
    1)
        echo "🚀 Déploiement sur Render..."
        echo "📋 Étapes :"
        echo "1. Aller sur https://render.com"
        echo "2. Créer un compte avec GitHub"
        echo "3. Cliquer sur 'New Web Service'"
        echo "4. Connecter votre repo GitHub"
        echo "5. Sélectionner le dossier 'backend'"
        echo "6. Configurer :"
        echo "   - Name: quiz-backend"
        echo "   - Environment: Node"
        echo "   - Build Command: npm install"
        echo "   - Start Command: npm start"
        echo "7. Ajouter les variables d'environnement :"
        echo "   - MONGO_URI=mongodb+srv://..."
        echo "   - JWT_SECRET=votre_secret_tres_securise"
        echo "   - NODE_ENV=production"
        echo "8. Cliquer sur 'Create Web Service'"
        ;;
    2)
        echo "🚀 Déploiement sur Railway..."
        echo "📋 Étapes :"
        echo "1. Aller sur https://railway.app"
        echo "2. Créer un compte avec GitHub"
        echo "3. Cliquer sur 'New Project'"
        echo "4. Sélectionner 'Deploy from GitHub repo'"
        echo "5. Choisir votre repository"
        echo "6. Railway détectera automatiquement Node.js"
        echo "7. Ajouter les variables d'environnement dans l'interface"
        ;;
    3)
        echo "🚀 Déploiement sur Heroku..."
        echo "📋 Étapes :"
        echo "1. Installer Heroku CLI : npm install -g heroku"
        echo "2. Créer un compte sur https://heroku.com"
        echo "3. Se connecter : heroku login"
        echo "4. Créer l'app : heroku create quiz-backend-app"
        echo "5. Configurer les variables :"
        echo "   heroku config:set MONGO_URI=mongodb+srv://..."
        echo "   heroku config:set JWT_SECRET=votre_secret_tres_securise"
        echo "   heroku config:set NODE_ENV=production"
        echo "6. Déployer : git push heroku main"
        ;;
    4)
        echo "🚀 Déploiement sur Vercel..."
        echo "📋 Étapes :"
        echo "1. Installer Vercel CLI : npm install -g vercel"
        echo "2. Se connecter : vercel login"
        echo "3. Déployer : vercel"
        echo "4. Configurer les variables :"
        echo "   vercel env add MONGO_URI"
        echo "   vercel env add JWT_SECRET"
        ;;
    5)
        echo "📋 Déploiement manuel..."
        echo "1. Configurer votre serveur"
        echo "2. Installer Node.js et npm"
        echo "3. Cloner le repository"
        echo "4. Installer les dépendances : npm install"
        echo "5. Configurer les variables d'environnement"
        echo "6. Démarrer le serveur : npm start"
        ;;
    *)
        echo "❌ Option invalide"
        exit 1
        ;;
esac

echo ""
echo "🎉 Instructions de déploiement affichées !"
echo ""
echo "📝 N'oubliez pas de :"
echo "1. Configurer MongoDB Atlas"
echo "2. Mettre à jour l'URL de l'API dans le frontend"
echo "3. Tester l'API après déploiement"
echo ""
echo "🔗 Documentation complète : GUIDE_HEBERGEMENT.md" 