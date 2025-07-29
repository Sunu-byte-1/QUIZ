const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  nom: {
    type: String,
    required: true,
    trim: true
  },
  pays: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  dateInscription: {
    type: Date,
    default: Date.now
  },
  derniereConnexion: {
    type: Date,
    default: Date.now
  },
  statistiques: {
    partiesJouees: { type: Number, default: 0 },
    scoreTotal: { type: Number, default: 0 },
    meilleurScore: { type: Number, default: 0 },
    tempsTotal: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('User', userSchema); 