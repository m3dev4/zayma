/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

'use client';
import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Menu, Transition } from '@headlessui/react';
import authApiStore from '@/api/zustand/authApi';
import { useStore } from '@/api/zustand/storeApi';
import NavItem from '@/components/navItem';
import { ChevronRight } from 'lucide-react';
import type { Store } from '@/types';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user, logout } = authApiStore();
  const { getMyStores } = useStore();
  const [userStore, setUserStore] = useState<Store | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserStore = async () => {
      if (user) {
        try {
          const stores = await getMyStores();
          if (stores && stores.length > 0) {
            setUserStore(stores[0]);
          }
        } catch (error: any) {
          console.error(
            'Erreur lors de la récupération de la boutique:',
            error,
          );
          if (error.response?.status === 401) {
            logout();
            router.push('/pages/login');
          }
        }
      }
    };
    fetchUserStore();
  }, [user, getMyStores]);

  const handleLogout = async () => {
    await logout();
  };

  const shopMenuItems = [
    { name: 'Découvrir', href: '/products' },
    { name: 'Liste de souhaits', href: '/wishlist' },
    { name: 'Panier', href: '/cart' },
  ];

  return (
    <div className="w-full min-h-screen bg-primary overflow-hidden">
      <div className="flex w-full p-5 m-auto">
        <nav className="flex justify-between items-center flex-row w-full">
          <ul className="flex items-center justify-center gap-8 px-8">
            {/* Logo/Brand */}
            <Menu as="div" className="relative">
              <Menu.Button className="font-poppins text-white font-bold text-xl hover:text-gray-300 flex gap-1">
                Zayma
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down relative top-2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 left-0 mt-2 w-[500px] h-[500px] origin-top-left bg-[#2A2A2A] rounded-lg shadow-xl ring-1 ring-black/5 focus:outline-none backdrop-blur-sm">
                  <div className="px-6 py-4 flex justify-between items-start w-full">
                    <div className="flex-col flex justify-center space-y-2">
                      <h1 className="text-sans font-bold text-2xl text-white mb-6 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-blue-500"
                        >
                          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                          <path d="M12 3v6" />
                        </svg>
                        Shop
                      </h1>
                      {shopMenuItems.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={`${
                                active ? 'bg-[#363636]' : ''
                              } group flex font-semibold font-poppins items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:shadow-lg transition-all duration-200`}
                            >
                              {item.name === 'Découvrir' && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="text-green-500"
                                >
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="m9 12 2 2 4-4" />
                                </svg>
                              )}
                              {item.name === 'Liste de souhaits' && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="text-red-500"
                                >
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                              )}
                              {item.name === 'Panier' && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="text-yellow-500"
                                >
                                  <circle cx="8" cy="21" r="1" />
                                  <circle cx="19" cy="21" r="1" />
                                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>
                              )}
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>

                    {/* Barre verticale de séparation avec effet de gradient */}
                    <div className="w-[1px] h-[400px] bg-gradient-to-b from-gray-600/20 via-gray-600 to-gray-600/20 mx-8"></div>

                    <div className="flex-col flex justify-center space-y-2">
                      <h1 className="text-sans font-bold text-2xl text-white mb-6 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-purple-500"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                        {userStore ? 'Votre boutique' : 'Créer'}
                      </h1>
                      {user && userStore ? (
                        <>
                          <Link
                            href={`/pages/myStore/${userStore._id}/dashboard`}
                            className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:bg-[#363636]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-orange-500"
                            >
                              <rect width="18" height="18" x="3" y="3" rx="2" />
                              <path d="M3 9h18" />
                              <path d="M9 21V9" />
                            </svg>
                            Dashboard
                          </Link>

                          {/* Menu Gérer votre boutique */}
                          <Menu as="div" className="relative w-full">
                            <Menu.Button className="w-full group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:bg-[#363636]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-blue-500"
                              >
                                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                                <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
                              </svg>
                              Gérer votre boutique
                              <ChevronRight className="ml-auto h-4 w-4" />
                            </Menu.Button>
                            <Menu.Items className="absolute left-full top-0 ml-2 w-48 rounded-md bg-[#2A2A2A] shadow-lg">
                              <Menu.Item>
                                <Link
                                  href={`/pages/myStore/${userStore._id}/update`}
                                  className="block px-4 py-2 text-sm text-white hover:bg-[#363636]"
                                >
                                  Mise à jour
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  href="pages/myStore/delete"
                                  className="block px-4 py-2 text-sm text-white hover:bg-[#363636]"
                                >
                                  Supprimer
                                </Link>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>

                          {/* Menu Mes produits */}
                          <Menu as="div" className="relative w-full">
                            <Menu.Button className="w-full group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:bg-[#363636]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-green-500"
                              >
                                <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
                                <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
                              </svg>
                              Mes produits
                              <ChevronRight className="ml-auto h-4 w-4" />
                            </Menu.Button>
                            <Menu.Items className="absolute left-full top-0 ml-2 w-48 rounded-md bg-[#2A2A2A] shadow-lg">
                              <Menu.Item>
                                <Link
                                  href={`/pages/myStore/${userStore._id}/products/add`}
                                  className="block px-4 py-2 text-sm text-white hover:bg-[#363636]"
                                >
                                  Ajouter un produit
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  href={`/pages/myStore/${userStore._id}/products`}
                                  className="block px-4 py-2 text-sm text-white hover:bg-[#363636]"
                                >
                                  Modifier un produit
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  href={`/pages/myStore/${userStore._id}/products`}
                                  className="block px-4 py-2 text-sm text-white hover:bg-[#363636]"
                                >
                                  Supprimer un produit
                                </Link>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>

                          {/* Menu Gérer mes commandes */}
                          <Menu as="div" className="relative w-full">
                            <Menu.Button className="w-full group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:bg-[#363636]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-yellow-500"
                              >
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                              </svg>
                              Gérer mes commandes
                              <ChevronRight className="ml-auto h-4 w-4" />
                            </Menu.Button>
                            <Menu.Items className="absolute left-full top-0 ml-2 w-48 rounded-md bg-[#2A2A2A] shadow-lg">
                              <Menu.Item>
                                <Link
                                  href={`/pages/myStore/${userStore._id}/orders`}
                                  className="block px-4 py-2 text-sm text-white hover:bg-[#363636]"
                                >
                                  Gérer les commandes
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  href={`/pages/myStore/${userStore._id}/orders/history`}
                                  className="block px-4 py-2 text-sm text-white hover:bg-[#363636]"
                                >
                                  Historique des commandes
                                </Link>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </>
                      ) : (
                        <Link
                          href="/pages/createStore"
                          className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:bg-[#363636]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-orange-500"
                          >
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
                            <path d="M12 11v6" />
                            <path d="M9 14h6" />
                          </svg>
                          Créer une boutique
                        </Link>
                      )}
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Shop Menu */}
            <Link
              href="/support"
              className="font-sans text-white tracking-wide uppercase font-semibold text-3xl hover:text-gray-300"
            >
              Store
            </Link>

            <Link
              href="/support"
              className="font-sans text-white tracking-wide hover:text-gray-300"
            >
              Assistance
            </Link>
          </ul>

          <ul className="flex justify-between items-center gap-8 pr-8">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-globe text-white hover:text-gray-300 cursor-pointer"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </li>

            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="text-white hover:text-gray-300 flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  {user.firstName}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right bg-[#2A2A2A] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/account"
                            className={`${
                              active ? 'bg-[#363636]' : ''
                            } group flex font-bold items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:shadow-lg transition-all duration-200`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-blue-500"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            Compte
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-[#363636]' : ''
                            } group flex font-bold w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:shadow-lg transition-all duration-200`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-red-500"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                              <polyline points="16 17 21 12 16 7" />
                              <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Déconnexion
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <li>
                  <Link href="/pages/login">
                    <Button className="bg-neutral-600 px-3 py-1 rounded-lg text-white hover:bg-neutral-700 text-sans font-semibold">
                      Se connecter
                    </Button>
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={() =>
                      alert('Veuillez vous connecter pour créer une boutique')
                    }
                    className="bg-blue-600 px-3 py-1 rounded-lg text-white hover:bg-blue-700 text-sans font-semibold"
                  >
                    Créer une boutique
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="w-full h-full sticky m-5 overflow-hidden px-16">
        <NavItem />
      </div>
    </div>
  );
};

export default Page;
