export interface StoreFormState {
    store: Store | null
    loading: boolean
    error: string | null
}

export interface CreateStorePayload {
    name: string
    description: string
    logo: File | null
    phone: string
    address: string
    openingHours: string
}

export interface Store {
    id: string
    _id: string
    name: string
    description: string
    logo?: string
    owner: string
    isActive: boolean
    link?: string
    createdAt: string
    phone: string
    address: string
    openingHours: string
}