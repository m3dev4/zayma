'use client';

import React, { useState } from 'react';
import { useCreateStore } from '@/hooks/useStoreQuery';
import { CreateStorePayload } from '@/types';
import toast from 'react-hot-toast';

export default function CreateStorePage() {
  const [formData, setFormData] = useState<CreateStorePayload>({
    name: '',
    description: '',
    logo: null,
  });

  const { mutate: createStore, isPending } = useCreateStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de base
    if (!formData.name || !formData.description || !formData.logo) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    createStore(formData, {
      onSuccess: () => {
        // Réinitialisation du formulaire
        setFormData({
          name: '',
          description: '',
          logo: null,
        });
        toast.success('Boutique créée avec succès');
      },
      onError: (error) => {
        toast.error(
          error.message || 'Erreur lors de la création de la boutique',
        );
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer une nouvelle boutique</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Nom de la boutique
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="logo" className="block mb-2">
            Logo de la boutique
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? 'Création en cours...' : 'Créer'}
        </button>
      </form>
    </div>
  );
}
