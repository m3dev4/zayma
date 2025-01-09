import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers';

export const metadata: Metadata = {
  title: 'Zayma',
  description:
    'Marketplace de vente en ligne pour les acheteurs et les vendeurs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <main className="min-h-screen w-full">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
