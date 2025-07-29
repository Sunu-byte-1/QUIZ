import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

// Configuration CORS plus permissive pour résoudre "Failed to fetch"
app.use(cors({
  origin: true, // Autoriser toutes les origines
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

// Route de test pour /api
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API Quiz backend opérationnelle',
    endpoints: {
      auth: '/api/auth',
      register: '/api/auth/register',
      login: '/api/auth/login',
      users: '/api/auth/users',
      me: '/api/auth/me'
    }
  });
});

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Quiz backend opérationnelle');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Serveur backend sur http://localhost:' + PORT)); 