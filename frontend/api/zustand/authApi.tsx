import { create } from 'zustand';
import axios from 'axios';

interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  gender?: string;
  country?: string;
  token?: string; // Si un token est renvoyé par le backend
}

interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender?: string;
  country?: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (userData: UserRegister) => Promise<User>;
  login: (userData: UserLogin) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
  initializeAuth: () => void;
  resetState: () => void;
}

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://ominous-space-halibut-4jqjr9799jr73q7wp-8080.app.github.dev/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

const authApiStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  // Action pour gérer l'inscription
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/register', userData); // Remplacez par l'URL correcte
      const user = response.data;
      set({ user, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(user));
      return user;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Une erreur est survenue',
        loading: false,
      });
      throw error;
    }
  },

  // Action pour gérer la connexion
  login: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/login', userData); // Remplacez par l'URL correcte
      const user = response.data;
      set({ user, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(user));
      return user;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Identifiants invalides',
        loading: false,
      });
      throw error;
    }
  },

  // Action pour gérer la déconnexion
  logout: async () => {
    try {
      await api.post('/users/logout');
      set({ user: null, error: null });
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  },

  // Action pour mettre à jour le profil
  updateProfile: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put<User>('/users/profile', userData);
      set({ user: data, loading: false });
      return data;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  // Initialiser l'utilisateur à partir du localStorage
  initializeAuth: () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      set({ user: JSON.parse(userInfo) });
    }
  },

  // Réinitialiser l'état
  resetState: () => {
    set({ user: null, loading: false, error: null });
  },
}));

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Une erreur est survenue';
  }
  return 'Une erreur inattendue est survenue';
};

export default authApiStore;
