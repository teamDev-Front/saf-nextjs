// lib/auth.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Mudança para bcryptjs
import { prisma } from './prisma';

// Tipos
export interface JwtPayload {
  id: number;
  email: string;
  name: string;
  is_admin: boolean;
  iat?: number;
  exp?: number;
}

// Hash de senha
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Comparar senha
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Gerar token JWT
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET || 'default-secret', {
    expiresIn: '24h'
  });
}

// Verificar token JWT
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as JwtPayload;
  } catch (error) {
    return null;
  }
}

// Obter usuário atual a partir do token nos cookies
export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return null;
  }
  
  const payload = verifyToken(token);
  
  if (!payload) {
    return null;
  }
  
  // Verificar se o usuário ainda existe
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      name: true,
      email: true,
      is_admin: true,
      createdAt: true
    }
  });
  
  return user;
}

// Middleware para verificar autenticação
export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.json(
      { message: 'Acesso negado' },
      { status: 401 }
    );
  }
  
  const payload = verifyToken(token);
  
  if (!payload) {
    return NextResponse.json(
      { message: 'Token inválido ou expirado' },
      { status: 403 }
    );
  }
  
  return null; // Prossegue normalmente se estiver autenticado
}

// Middleware para verificar admin
export async function adminMiddleware(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  
  if (authResponse) {
    return authResponse; // Retorna resposta de erro se não estiver autenticado
  }
  
  const token = req.cookies.get('token')?.value;
  const payload = verifyToken(token!);
  
  if (!payload?.is_admin) {
    return NextResponse.json(
      { message: 'Acesso restrito ao administrador' },
      { status: 403 }
    );
  }
  
  return null; // Prossegue normalmente se for admin
}