/* eslint-disable react/no-unescaped-entities */
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import authApiStore from '@/api/zustand/authApi';
import { useStore } from '@/api/zustand/storeApi';

const SideBarDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [storeId, setStoreId] = useState(null);
  const { user } = authApiStore();
  const { getMyStores } = useStore();

  useEffect(() => {
    const fetchUserStore = async () => {
      if (user) {
        try {
          const stores = await getMyStores();
          if (stores && stores.length > 0) {
            setStoreId(stores[0]._id);
          }
        } catch (error) {
          console.error('Error fetching user store', error);
        }
      }
    };
    fetchUserStore();
  }, [user, getMyStores]);

  const navItems = [
    {
      label: 'Dashboard',
      href: `/pages/myStore/${storeId}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      label: 'Boutique',
      href: `/pages/myStore/${storeId}/boutique`,
      icon: Store,
    },
    {
      label: 'Produits',
      href: `/pages/myStore/${storeId}/products`,
      icon: Package,
    },
    {
      label: 'Commandes',
      href: `/pages/myStore/${storeId}/orders`,
      icon: ShoppingCart,
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: MessageSquare,
    },
    {
      label: 'Avis',
      href: '/reviews',
      icon: Star,
    },
  ];

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        h-screen
        transition-all
        duration-300
        ease-in-out
        ${collapsed ? 'w-20' : 'w-72'}
        bg-gradient-to-br
        from-gray-900/95
        to-gray-950/95
        backdrop-blur-xl
        border-r
        border-white/10
        shadow-[0_0_15px_rgba(0,0,0,0.2)]
        z-50
      `}
    >
      {/* Contenu du sidebar */}
      <div className="flex flex-col h-full relative">
        {/* Header avec bouton toggle */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              <Link href="/">Zayma</Link>
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      relative
                      flex
                      items-center
                      gap-4
                      px-4
                      py-3
                      rounded-xl
                      transition-all
                      duration-300
                      group
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                          : 'hover:bg-white/5'
                      }
                    `}
                  >
                    {/* Icône avec effet de glow */}
                    <div
                      className={`
                        relative
                        rounded-lg
                        p-2
                        transition-transform
                        duration-300
                        ${isActive ? 'text-blue-400' : 'text-gray-400'}
                        group-hover:scale-110
                        group-hover:text-blue-400
                      `}
                    >
                      <div
                        className={`
                          absolute
                          inset-0
                          rounded-lg
                          bg-blue-400/20
                          blur-sm
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                          duration-300
                        `}
                      />
                      <item.icon className="w-5 h-5 relative z-10" />
                    </div>

                    {/* Label */}
                    {!collapsed && (
                      <span
                        className={`
                          text-sm
                          font-medium
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? 'text-blue-400'
                              : 'text-gray-400 group-hover:text-blue-400'
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    )}

                    {/* Indicateur actif */}
                    {isActive && (
                      <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
            {!collapsed && (
              <div>
                <p className="text-sm font-medium text-gray-200">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBarDashboard;
