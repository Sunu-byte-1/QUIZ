// Configuration de l'URL de l'API - Forcer le backend déployé
const API_BASE_URL = 'https://quiz-zoxq.onrender.com/api';

console.log('🌐 API URL:', API_BASE_URL, '(DEPLOYED)');

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

  // Méthodes d'authentification avec retry
  async register(userData: {
    email: string;
    password: string;
    prenom: string;
    nom: string;
    pays: string;
    age: number;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
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
    } catch (error) {
      console.error('❌ Erreur inscription:', error);
      throw error;
    }
  }

  async login(email: string, password: string, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔐 Tentative de connexion ${attempt}/${maxRetries}`);
        
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
        console.log('✅ Connexion réussie');
        return data;
      } catch (error) {
        console.error(`❌ Tentative ${attempt} échouée:`, error);
        if (attempt === maxRetries) {
          throw error;
        }
        // Attendre avant de réessayer
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  async checkAuth() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Token invalide');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Erreur vérification auth:', error);
      throw error;
    }
  }

  // Méthodes admin
  async getUsers() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/users`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la récupération des utilisateurs');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Erreur récupération utilisateurs:', error);
      throw error;
    }
  }

  async getStats() {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/stats`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la récupération des statistiques');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Erreur récupération stats:', error);
      throw error;
    }
  }

  // Méthode générique pour les requêtes GET
  async get(endpoint: string) {
    if (!this.token) {
      throw new Error('Non authentifié');
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la requête');
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Erreur requête GET:', error);
      throw error;
    }
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