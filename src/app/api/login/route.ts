// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken, comparePassword } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar usuário
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }
    
    // Verificar senha
    const validPassword = await comparePassword(password, user.password);
    
    if (!validPassword) {
      return NextResponse.json(
        { message: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }
    
    // Gerar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      is_admin: user.is_admin
    });
    
    // Definir cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia
      path: '/'
    });
    
    return NextResponse.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin
      }
    });
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    return NextResponse.json(
      { message: 'Erro ao processar o login', error: error.message },
      { status: 500 }
    );
  }
}