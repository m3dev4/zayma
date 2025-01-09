/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { useDeleteStore } from '@/hooks/useStoreQuery';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface DeleteStoreProps {
  storeId: string;
}

const DeleteStore = ({ storeId }: DeleteStoreProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { mutate: deleteStore, isPending } = useDeleteStore();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteStore(storeId, {
        onSuccess: () => {
          toast.success('Boutique supprimée avec succès');
          router.push('/');
        },
        onError: (error) => {
          toast.error(
            error.message || 'Une erreur est survenue lors de la suppression',
          );
        },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div className="relative">
      {/* Bouton de suppression */}
      <button
        onClick={() => setShowConfirmation(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
        disabled={isPending}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
        {isPending ? 'Suppression...' : 'Supprimer la boutique'}
      </button>

      {/* Modal de confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer votre boutique ? Cette action
              est irréversible.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                {isPending ? 'Suppression...' : 'Confirmer la suppression'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteStore;
