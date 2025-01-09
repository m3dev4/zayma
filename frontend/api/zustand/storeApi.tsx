import { create } from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';
import { CreateStorePayload, Store, StoreFormState } from '@/types';
import { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/stores',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('jwt='))
    ?.split('=')[1];

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface StoreState extends StoreFormState {
  createStore: (data: CreateStorePayload) => Promise<Store>;
  getStores: () => Promise<Store[]>;
  getMyStores: () => Promise<Store[]>;
  getStoreById: (id: string) => Promise<Store>;
  updateStore: (id: string, formData: FormData) => Promise<Store>;
  deleteStore: (id: string) => Promise<void>;
  getAdminStores: () => Promise<Store[]>;
  getStoreStats: () => Promise<any>;
  toggleStoreStatus: (id: string) => Promise<Store>;
}

export const useStore = create(
  persist<StoreState>((set) => ({
    store: null,
    loading: false,
    error: null,

    createStore: async (data: CreateStorePayload) => {
      set({ loading: true, error: null });
      try {
        const userInfoStr = localStorage.getItem('userInfo');
        if (!userInfoStr) {
          throw new Error('Utilisateur non connecté');
        }

        const userInfo = JSON.parse(userInfoStr);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if (data.logo) {
          formData.append('logo', data.logo);
        }

        const response = await api.post('/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
          withCredentials: true,
        });

        console.log('Réponse création store:', response.data);
        set({ store: response.data, loading: false });
        return response.data;
      } catch (error: any) {
        console.error('Erreur détaillée:', {
          message: error.message,
          response: error.response?.data,
          config: error.config,
        });
        throw error;
      }
    },

    getStores: async () => {
      set({ loading: true, error: null });
      try {
        const response = await api.get('/');
        return response.data.stores;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },

    getMyStores: async () => {
      set({ loading: true, error: null });
      try {
        const response = await api.get('/mystores');
        return response.data;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },

    getStoreById: async (id: string) => {
      set({ loading: true, error: null });
      try {
        const response = await api.get(`/${id}`);
        set({ store: response.data, loading: false });
        return response.data;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },

    updateStore: async (id: string, formData: FormData) => {
      set({ loading: true, error: null });
      try {
        const response = await api.put(`/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        set({ store: response.data, loading: false });
        return response.data;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },

    deleteStore: async (id: string) => {
      set({ loading: true, error: null });
      try {
        await api.delete(`/${id}`);
        set({ loading: false, store: null });
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },

    getAdminStores: async () => {
      set({ loading: true, error: null });
      try {
        const response = await api.get('/admin/all');
        return response.data.stores;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },

    getStoreStats: async () => {
      set({ loading: true, error: null });
      try {
        const response = await api.get('/admin/stats');
        return response.data;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },

    toggleStoreStatus: async (id: string) => {
      set({ loading: true, error: null });
      try {
        const response = await api.put(`/admin/${id}/toggle`);
        return response.data;
      } catch (error: any) {
        set({
          error: error.response?.data?.message || 'Une erreur est survenue',
          loading: false,
        });
        throw error;
      }
    },
  })),
);
