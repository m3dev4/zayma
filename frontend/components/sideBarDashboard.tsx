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
  User,
} from 'lucide-react';
import authApiStore from '@/api/zustand/authApi';
import { useStore } from '@/api/zustand/storeApi';

const SideBarDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [storeId, setStoreId] = useState(null);
  const { user } = authApiStore();
  const { getMyStores } = useStore();

  // Fetch store data once when component mounts
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

  // Generate navigation items only after storeId is available
  const getNavItems = () => [
    {
      label: 'Dashboard',
      href: `/pages/myStore/${storeId}/dashboard`,
      icon: LayoutDashboard,
      needsStore: true,
    },
    {
      label: 'Boutique',
      href: `/pages/myStore/${storeId}/boutique`,
      icon: Store,
      needsStore: true,
    },
    {
      label: 'Produits',
      href: `/pages/myStore/${storeId}/products`,
      icon: Package,
      needsStore: true,
    },
    {
      label: 'Commandes',
      href: `/pages/myStore/${storeId}/orders`,
      icon: ShoppingCart,
      needsStore: true,
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: MessageSquare,
      needsStore: false,
    },
    {
      label: 'Avis',
      href: '/reviews',
      icon: Star,
      needsStore: false,
    },
  ];

  // Filter navigation items based on storeId availability
  const navItems = getNavItems().filter(
    (item) => !item.needsStore || (item.needsStore && storeId),
  );

  return (
    <aside
      className={`
        relative
        h-screen
        transition-all
        duration-500
        ${collapsed ? 'w-20' : 'w-72'}
        bg-gradient-to-br
        from-gray-900
        to-gray-800
        shadow-[8px_0_30px_-12px_rgba(0,0,0,0.75)]
        backdrop-blur-xl
        overflow-hidden
      `}
    >
      {/* Glowing effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-30" />

      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {!collapsed && (
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Zayma
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-white" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-3">
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
                      px-4
                      py-3
                      rounded-xl
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? 'bg-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]'
                          : 'hover:bg-white/5'
                      }
                      group
                    `}
                  >
                    {/* Icon container with inner circle effect */}
                    <div
                      className={`
                        relative
                        w-10
                        h-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        transition-transform
                        duration-300
                        ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                      `}
                    >
                      {/* Outer glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-sm" />

                      {/* Inner circle */}
                      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner" />

                      {/* Icon */}
                      <item.icon
                        className={`
                          relative
                          w-5 
                          h-5
                          transition-colors
                          duration-300
                          ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                        `}
                      />
                    </div>

                    {/* Label */}
                    {!collapsed && (
                      <span
                        className={`
                          ml-4
                          text-sm
                          font-medium
                          transition-colors
                          duration-300
                          ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                        `}
                      >
                        {item.label}
                      </span>
                    )}

                    {/* Hover highlight effect */}
                    <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBarDashboard;
