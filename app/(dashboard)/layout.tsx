import AuthProvider from '@/components/auth-provider'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'
import MobileNav from '@/components/layout/mobile-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--background)]">
        <Sidebar />
        <Header />

        {/* Contenido principal */}
        <div className="lg:ml-64">
          <main className="max-w-[1200px] mx-auto px-4 py-6 pb-24 lg:pb-6">
            {children}
          </main>
        </div>

        <MobileNav />
      </div>
    </AuthProvider>
  )
}
