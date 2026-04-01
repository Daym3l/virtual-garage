import AuthProvider from '@/components/auth-provider'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'
import MobileNav from '@/components/layout/mobile-nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--background)] overflow-x-hidden">
        <Sidebar />
        <Header />

        {/* Contenido principal */}
        <div className="lg:ml-64">
          <main className="max-w-[1200px] mx-auto px-3 lg:px-8 pt-4 lg:pt-16 pb-24 lg:pb-12">
            {children}
          </main>
        </div>

        <MobileNav />
      </div>
    </AuthProvider>
  )
}
