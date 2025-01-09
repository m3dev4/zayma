/* eslint-disable react/no-unescaped-entities */
'use client';

import { Store } from '@/types';
import { useUpdateStore } from '@/hooks/useStoreQuery';
import { useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface UpdateStoreProps {
  store: Store;
}

const UpdateStore = ({ store }: UpdateStoreProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: store.name,
    description: store.description,
    phone: store.phone || '',
    address: store.address || '',
    openingHours: store.openingHours || '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(
    store.logo || null,
  );
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateStoreMutation = useUpdateStore(store.id);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('openingHours', formData.openingHours);

      if (newLogo) {
        formDataToSend.append('logo', newLogo);
      }

      await updateStoreMutation.mutateAsync({
        id: store.id,
        formData: formDataToSend,
      });
      setOpen(false);
    } catch (error) {
      console.error('Error updating store:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PencilIcon className="mr-2 h-4 w-4" />
        Modifier
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="store-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nom de la boutique
                        </label>
                        <input
                          type="text"
                          id="store-name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="store-description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="store-description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="store-phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="store-phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="store-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Adresse
                        </label>
                        <input
                          type="text"
                          id="store-address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="store-hours"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Horaires d&apos;ouverture
                        </label>
                        <input
                          type="text"
                          id="store-hours"
                          value={formData.openingHours}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              openingHours: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      {/* Logo Upload Section */}
                      <div className="mt-4">
                        <div className="flex justify-center">
                          <div className="relative">
                            {previewImage ? (
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="w-32 h-32 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                <PhotoIcon className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg"
                            >
                              <PencilIcon className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </div>
                      </div>

                      {/* Boutons d'action */}
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          disabled={updateStoreMutation.isPending}
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm disabled:opacity-50"
                        >
                          {updateStoreMutation.isPending
                            ? 'Mise à jour...'
                            : 'Mettre à jour'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UpdateStore;
