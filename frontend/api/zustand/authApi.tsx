import { create } from "zustand";
import axios from "axios";

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
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<User>;
  initializeAuth: () => void;
  resetState: () => void;
}


const authApiStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  // Action pour gérer l'inscription
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/users/register', userData); // Remplacez par l'URL correcte
      const user = response.data;
      set({ user, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(user));
      return user;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Une erreur est survenue",
        loading: false,
      });
      throw error;
    }
  },

  // Action pour gérer la connexion
  login: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/users/login', userData); // Remplacez par l'URL correcte
      const user = response.data;
      set({ user, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(user));
      return user;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Identifiants invalides",
        loading: false,
      });
      throw error;
    }
  },

  // Action pour gérer la déconnexion
  logout: () => {
    set({ user: null, error: null });
    localStorage.removeItem('userInfo');
  },

  // Action pour mettre à jour le profil
  updateProfile: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put('/api/users/profile', userData); // Remplacez par l'URL correcte
      const updatedUser = response.data;
      set({ user: updatedUser, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erreur lors de la mise à jour",
        loading: false,
      });
      throw error;
    }
  },

  // Initialiser l'utilisateur à partir du localStorage
  initializeAuth: () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      set({ user: JSON.parse(userInfo) });
    }
  },

  // Réinitialiser l'état
  resetState: () => {
    set({ user: null, loading: false, error: null });
  },
}));


export default authApiStore