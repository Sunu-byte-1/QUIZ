// Configuration de l'URL de l'API - Backend déployé sur Render
const API_BASE_URL = 'https://quiz-zoxq.onrender.com/api';

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

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Ajouter le token d'authentification si disponible
    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erreur réseau' }));
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erreur réseau');
    }
  }

  // Inscription
  async register(data: RegisterRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Connexion
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  // Récupérer la liste des utilisateurs (pour debug)
  async getUsers(): Promise<{ email: string }[]> {
    return this.request<{ email: string }[]>('/auth/users');
  }

  // Vérifier l'authentification avec le serveur
  async checkAuth(): Promise<{ email: string; prenom?: string; nom?: string; pays?: string; age?: number }> {
    return this.request<{ email: string; prenom?: string; nom?: string; pays?: string; age?: number }>('/auth/me');
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const apiService = new ApiService(); 