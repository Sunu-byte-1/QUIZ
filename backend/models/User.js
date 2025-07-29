import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  pays: { type: String, required: true },
  age: { type: Number, required: true, min: 5, max: 120 },
  dateInscription: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema); 