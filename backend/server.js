import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Quiz backend opérationnelle');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Serveur backend sur http://localhost:' + PORT)); 