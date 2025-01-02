import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
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
  token: string | null;
  loading: boolean;
  error: string | null;
  register: (userData: UserRegister) => Promise<User>;
  login: (userData: UserLogin) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;

  resetState: () => void;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/users',
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
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
const authApiStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      token: null,

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/register', userData);
          const user = response.data;
          set({ user, loading: false });
          return user;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Une erreur est survenue',
            loading: false,
          });
          throw error;
        }
      },

      login: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/login', userData);
          console.log('Réponse login brute:', response.data);

          if (!response.data) {
            throw new Error('Pas de données reçues du serveur');
          }

          // Construction de l'objet user
          const user = {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            role: response.data.role,
          };

          // Utiliser le token JWT au lieu de l'ID
          const token = response.data.token;
          if (!token) {
            console.error('Token manquant dans la réponse:', response.data);
            throw new Error(
              "Token d'authentification manquant dans la réponse",
            );
          }

          const userInfo = { user, token };
          console.log('Structure à sauvegarder dans localStorage:', userInfo);

          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          set({ user, token, loading: false });
          return user;
        } catch (error: any) {
          console.error('Erreur login détaillée:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });
          set({
            error: error.response?.data?.message || 'Identifiants invalides',
            loading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await api.post('/logout');
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
        } finally {
          // Suppression explicite du localStorage
          localStorage.removeItem('userInfo');

          set({
            user: null,
            token: null,
            error: null,
          });
        }
      },

      updateProfile: async (userData) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.put<User>('/profile', userData);
          set({ user: data, loading: false });
          return data;
        } catch (error) {
          const message = getErrorMessage(error);
          set({ error: message, loading: false });
          throw new Error(message);
        }
      },

      resetState: () => {
        set({ user: null, loading: false, error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthState) =>
        ({
          user: state.user,
          token: state.token,
        }) as Partial<AuthState>,
    },
  ),
);

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Une erreur est survenue';
  }
  return 'Une erreur inattendue est survenue';
};

export default authApiStore;
