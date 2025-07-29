import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  const { email, password, prenom, nom, pays, age } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });
    
    // Validation des données
    if (!email || !password || !prenom || !nom || !pays || !age) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    
    if (age < 5 || age > 120) {
      return res.status(400).json({ message: 'L\'âge doit être entre 5 et 120 ans' });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ 
      email, 
      password: hashed, 
      prenom, 
      nom, 
      pays, 
      age: parseInt(age) 
    });
    await user.save();
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Liste des inscrits (protégée)
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour vérifier le token (protégée)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId, 'email prenom nom pays age');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ 
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
      pays: user.pays,
      age: user.age
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router; 