const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Créer un admin par défaut au démarrage
const creerAdminParDefaut = async () => {
  try {
    const adminExistant = await User.findOne({ email: 'abdallahdiouf.dev@gmail.com' });
    if (!adminExistant) {
      const hashedPassword = await bcrypt.hash('Khoudia1970admin', 10);
      await User.create({
        email: 'abdallahdiouf.dev@gmail.com',
        password: hashedPassword,
        prenom: 'Abdallah',
        nom: 'Diouf',
        pays: 'Sénégal',
        age: 25,
        role: 'admin'
      });
      console.log('✅ Admin par défaut créé: abdallahdiouf.dev@gmail.com / Khoudia1970admin');
    }
  } catch (error) {
    console.error('Erreur création admin:', error);
  }
};

// Appeler la création d'admin au démarrage
creerAdminParDefaut();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { email, password, prenom, nom, pays, age } = req.body;

    // Validation
    if (!email || !password || !prenom || !nom || !pays || !age) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    if (age < 1 || age > 120) {
      return res.status(400).json({ message: 'L\'âge doit être entre 1 et 120 ans' });
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const nouvelUtilisateur = new User({
      email,
      password: hashedPassword,
      prenom,
      nom,
      pays,
      age,
      role: 'user'
    });

    await nouvelUtilisateur.save();

    // Créer le token JWT
    const token = jwt.sign(
      { 
        userId: nouvelUtilisateur._id, 
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: nouvelUtilisateur._id,
        email: nouvelUtilisateur.email,
        prenom: nouvelUtilisateur.prenom,
        nom: nouvelUtilisateur.nom,
        pays: nouvelUtilisateur.pays,
        age: nouvelUtilisateur.age,
        role: nouvelUtilisateur.role
      }
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    console.log('🔍 Debug connexion - req.body:', req.body);
    console.log('🔍 Debug connexion - Content-Type:', req.headers['content-type']);
    
    const { email, password } = req.body;

    console.log('🔍 Debug connexion - email:', email);
    console.log('🔍 Debug connexion - password:', password ? '***' : 'undefined');

    // Validation
    if (!email || !password) {
      console.log('❌ Validation échouée - email:', !!email, 'password:', !!password);
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      console.log('❌ Utilisateur non trouvé:', email);
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('✅ Utilisateur trouvé:', utilisateur.email);

    // Vérifier le mot de passe
    const motDePasseValide = await bcrypt.compare(password, utilisateur.password);
    if (!motDePasseValide) {
      console.log('❌ Mot de passe incorrect pour:', email);
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('✅ Mot de passe correct pour:', email);

    // Mettre à jour la dernière connexion
    utilisateur.derniereConnexion = new Date();
    await utilisateur.save();

    // Créer le token JWT
    const token = jwt.sign(
      { 
        userId: utilisateur._id, 
        email: utilisateur.email,
        role: utilisateur.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Connexion réussie pour:', email);

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: utilisateur._id,
        email: utilisateur.email,
        prenom: utilisateur.prenom,
        nom: utilisateur.nom,
        pays: utilisateur.pays,
        age: utilisateur.age,
        role: utilisateur.role
      }
    });
  } catch (error) {
    console.error('❌ Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

// Obtenir les informations de l'utilisateur connecté
router.get('/me', auth, async (req, res) => {
  try {
    const utilisateur = await User.findById(req.user.userId).select('-password');
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(utilisateur);
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route admin - Obtenir tous les utilisateurs
router.get('/users', adminAuth, async (req, res) => {
  try {
    const utilisateurs = await User.find({}).select('-password').sort({ dateInscription: -1 });
    res.json(utilisateurs);
  } catch (error) {
    console.error('Erreur récupération utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route admin - Statistiques globales
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUtilisateurs = await User.countDocuments();
    const nouveauxUtilisateurs = await User.countDocuments({
      dateInscription: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const utilisateursActifs = await User.countDocuments({
      derniereConnexion: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    const statsGlobales = await User.aggregate([
      {
        $group: {
          _id: null,
          totalParties: { $sum: '$statistiques.partiesJouees' },
          totalScore: { $sum: '$statistiques.scoreTotal' },
          totalTemps: { $sum: '$statistiques.tempsTotal' },
          meilleurScoreGlobal: { $max: '$statistiques.meilleurScore' }
        }
      }
    ]);

    res.json({
      totalUtilisateurs,
      nouveauxUtilisateurs,
      utilisateursActifs,
      statsGlobales: statsGlobales[0] || {
        totalParties: 0,
        totalScore: 0,
        totalTemps: 0,
        meilleurScoreGlobal: 0
      }
    });
  } catch (error) {
    console.error('Erreur statistiques:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router; 