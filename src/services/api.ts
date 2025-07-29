// Configuration de l'URL de l'API - Basculement automatique local/déployé
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api' 
  : 'https://quiz-zoxq.onrender.com/api';

console.log('🌐 API URL:', API_BASE_URL, isDevelopment ? '(LOCAL)' : '(DEPLOYED)');

export interface LoginResponse {
  token: string;
  email: string;
  prenom?: string;
  nom?: string;
  pays?: string;
  age?: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  prenom: string;
  nom: string;
  pays: string;
  age: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

class ApiService {
  private token: string | null = null;

  // Méthodes d'authentification
  async register(userData: {
    email: string;
    password: string;
    prenom: string;
    nom: string;
    pays: string;
    age: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    }

    const data = await response.json();
    this.token = data.token;
    localStorage.setItem('token', data.token);
    return data;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la connexion');
    }

    const data = await response.json();
    this.token = data.token;
    localStorage.setItem('token', data.token);
    return data;
  }

  async checkAuth() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token invalide');
    }

    return await response.json();
  }

  // Méthodes admin
  async getUsers() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération des utilisateurs');
    }

    return await response.json();
  }

  async getStats() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_BASE_URL}/auth/stats`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération des statistiques');
    }

    return await response.json();
  }

  // Méthode générique pour les requêtes GET
  async get(endpoint: string) {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la requête');
    }

    return await response.json();
  }

  // Méthodes utilitaires
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Initialiser le token depuis localStorage
  init() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token = savedToken;
    }
  }
}

export const apiService = new ApiService();
apiService.init(); 