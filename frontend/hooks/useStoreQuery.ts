import { useStore } from "@/api/zustand/storeApi"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateStorePayload, Store } from "@/types"
import toast from "react-hot-toast"



export const STORE_KEYS = {
    all: ['stores'] as const,
    myStores: ['my-stores'] as const,
    adminStores: ['admin-stores'] as const,
    store: ['store'] as const,
    stats: ['store-stats'] as const
}

export const useCreateStore = () => {
    const { createStore } = useStore.getState()
    const queryClient = useQueryClient()

    return useMutation<Store, Error, CreateStorePayload>({
        mutationFn: (data) => {
            console.log('Creating store with data:', data);
            return createStore(data);
        },
        onSuccess: (newStore) => {
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.all })
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.myStores })
            toast.success('Boutique crée')
            return newStore
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Erreur lors de la création de la boutique')
            throw error
        }
    })
}

export const useStores = (options?: { enabled?: boolean }) => {
    const { getStores } = useStore.getState()
    return useQuery<Store[], Error>({
        queryKey: STORE_KEYS.all,
        queryFn: getStores,
        ...options
    })
}

export const useMyStores = (options?: { enabled?: boolean }) => {
    const { getMyStores } = useStore.getState()
    return useQuery<Store[], Error>({
        queryKey: STORE_KEYS.myStores,
        queryFn: getMyStores,
        ...options
    })
}

export const useUpdateStore = (id: string) => {
    const { updateStore } = useStore.getState()
    const queryClient = useQueryClient()

    return useMutation<Store, Error, { id: string; formData: FormData }>({
        mutationFn: ({ formData }) => {
            console.log('Updating store with data:', Object.fromEntries(formData));
            return updateStore(id, formData);
        },
        onSuccess: (updatedStore) => {
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.all })
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.store(id) })
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.myStores })
            toast.success('Boutique mise à jour')
            return updatedStore
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Erreur lors de la mise à jour de la boutique')
            throw error
        }
    })
}

export const useDeleteStore = () => {
    const { deleteStore } = useStore.getState()
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: deleteStore,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.all })
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.myStores })
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.adminStores })
            toast.success('Boutique supprimée')
        }, onError(error: Error) {
            toast.error(error.message || 'Erreur lors de la suppression de la boutique')
        }

    })
}

export const useAdminStore = (options?: { enabled?: boolean }) => {
    const { getAdminStores } = useStore.getState()
    return useQuery<Store[], Error>({
        queryKey: STORE_KEYS.adminStores,
        queryFn: getAdminStores,
        ...options
    })
}

export const useStoreStats = (options?: { enabled?: boolean }) => {
    const { getStoreStats } = useStore.getState()
    return useQuery<any, Error>({
        queryKey: STORE_KEYS.stats,
        queryFn: getStoreStats,
        ...options
    })
}

export const useToggleStoreStatus = () => {
    const { toggleStoreStatus } = useStore.getState();
    const queryClient = useQueryClient();

    return useMutation<Store, Error, string>({
        mutationFn: toggleStoreStatus,
        onSuccess: (updatedStore) => {
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.all });
            queryClient.invalidateQueries({ queryKey: STORE_KEYS.adminStores });
            queryClient.invalidateQueries({
                queryKey: STORE_KEYS.store(updatedStore._id as string)
            });
            toast.success('Statut de la boutique modifié avec succès');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Erreur lors du changement de statut');
            throw error;
        }
    });
};