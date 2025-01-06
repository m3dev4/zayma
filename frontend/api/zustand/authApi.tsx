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
          const data = response.data;

          if (!data || !data.token) {
            throw new Error('Token manquant dans la réponse');
          }

          // Stocker les informations utilisateur dans le localStorage
          const userInfo = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            role: data.role,
            isAdmin: data.isAdmin,
          };

          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          // Définir le cookie JWT manuellement
          document.cookie = `jwt=${data.token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;

          set({
            user: userInfo,
            token: data.token,
            loading: false,
          });

          return userInfo;
        } catch (error: any) {
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
          // Supprimer le cookie JWT
          document.cookie =
            'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          // Supprimer les données du localStorage
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
