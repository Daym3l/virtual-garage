import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login']
const AUTH_COOKIE = 'auth-session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get(AUTH_COOKIE)?.value

  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))

  // Usuario autenticado intentando acceder a login → redirige al dashboard
  if (isPublic && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Usuario no autenticado intentando acceder a ruta protegida → redirige al login
  if (!isPublic && !session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
