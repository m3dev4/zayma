/* eslint-disable react/no-unescaped-entities */
'use client';

import SideBarDashboard from '@/components/sideBarDashboard';
import React from 'react';
import UpdateStore from './update/page';
import { useMyStores } from '@/hooks/useStoreQuery';
import {
  LinkIcon,
  Loader2,
  StoreIcon,
  Calendar,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

const GetMyStore = () => {
  const { data: stores, isLoading } = useMyStores();
  const store = stores?.[0];
  const storeLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/store/${store?._id}`;

  // Ajouter ces logs pour déboguer
  console.log('Store data:', store);
  console.log('Phone:', store?.phone);
  console.log('Address:', store?.address);
  console.log('Opening Hours:', store?.openingHours);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="p-0 w-full m-auto flex items-start gap-20">
        <div>
          <SideBarDashboard />
        </div>
        <div className="flex-1 p-8 relative items-center flex justify-center">
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 max-w-4xl mx-auto border border-white/20">
            {/* En-tête avec effet glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl" />

            <div className="relative">
              <h1 className="text-3xl font-bold mb-8 text-white bg-clip-text">
                Informations de la Boutique
              </h1>

              {store && (
                <div className="space-y-8">
                  {/* Logo de la boutique */}
                  <div className="flex justify-center mb-8">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                      <div className="relative w-40 h-40 rounded-full overflow-hidden transform hover:scale-105 transition duration-300">
                        {store.logo ? (
                          <Image
                            src={store.logo}
                            alt={store.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <StoreIcon className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Informations de la boutique */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition duration-300 transform hover:-translate-y-1">
                      <h2 className="text-lg font-semibold text-white mb-3">
                        Nom de la boutique
                      </h2>
                      <p className="text-xl text-blue-400">{store.name}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition duration-300 transform hover:-translate-y-1">
                      <h2 className="text-lg font-semibold text-white mb-3">
                        Description
                      </h2>
                      <p className="text-gray-300">{store.description}</p>
                    </div>

                    {/* Lien de la boutique */}
                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition duration-300 transform hover:-translate-y-1 md:col-span-2">
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-blue-400" />
                        Lien de la boutique
                      </h2>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={storeLink}
                          readOnly
                          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(storeLink);
                            toast.success('Lien copié !');
                          }}
                          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          Copier
                        </button>
                      </div>
                    </div>

                    {/* Nouveaux champs */}
                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition duration-300 transform hover:-translate-y-1">
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-400" />
                        Téléphone
                      </h2>
                      <p className="text-gray-300">{store.phone}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition duration-300 transform hover:-translate-y-1">
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        Adresse
                      </h2>
                      <p className="text-gray-300">{store.address}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition duration-300 transform hover:-translate-y-1">
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        Horaires d'ouverture
                      </h2>
                      <p className="text-gray-300">{store.openingHours}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition duration-300 transform hover:-translate-y-1">
                      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        Date de création
                      </h2>
                      <p className="text-gray-300">
                        {new Date(store.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
                    <div className="flex-1 transform hover:scale-[1.02] transition-all duration-300">
                      <UpdateStore store={store} />
                    </div>
                    {/* <div className="transform hover:scale-[1.02] transition-all duration-300">
                      {store && <DeleteButton storeId={store._id} />}
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetMyStore;
