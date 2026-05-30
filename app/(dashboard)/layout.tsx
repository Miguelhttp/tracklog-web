'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirecionar o usuário para a página de login se ele não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Ou um componente de carregamento

  return (
    <div className="flex h-screen bg-page transition-colors duration-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  )
}
