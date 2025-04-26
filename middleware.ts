// middleware.ts (corrigido)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Função de verificação de token diretamente no middleware
function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
  } catch (error) {
    return null;
  }
}

const protectedRoutes = [
  '/profile',
  '/admin'
];

const authRoutes = [
  '/login',
  '/register'
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = token && verifyToken(token);

  // Redirecionar para login se tentar acessar rota protegida sem autenticação
  if (protectedRoutes.some(route => path.startsWith(route)) && !isAuthenticated) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // Redirecionar para home se tentar acessar rotas de autenticação já estando autenticado
  if (authRoutes.includes(path) && isAuthenticated) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};