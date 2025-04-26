// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  console.log('[REGISTER] Iniciando processo de registro');
  
  try {
    const body = await req.json();
    console.log('[REGISTER] Dados recebidos:', JSON.stringify({
      name: body.name,
      email: body.email,
      password: body.password ? '[SENHA OCULTADA]' : undefined,
      confirmPassword: body.confirmPassword ? '[SENHA OCULTADA]' : undefined
    }));
    
    const { name, email, password, confirmPassword } = body;
    
    // Validação básica
    if (!name || !email || !password || !confirmPassword) {
      console.log('[REGISTER] Erro de validação: Campos faltando', { 
        namePresent: !!name, 
        emailPresent: !!email, 
        passwordPresent: !!password, 
        confirmPasswordPresent: !!confirmPassword 
      });
      
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }
    
    if (password !== confirmPassword) {
      console.log('[REGISTER] Erro de validação: Senhas não coincidem');
      
      return NextResponse.json(
        { message: 'As senhas não coincidem' },
        { status: 400 }
      );
    }
    
    // Verificar se o email já existe
    console.log('[REGISTER] Verificando se o email já existe:', email);
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      console.log('[REGISTER] Email já cadastrado:', email);
      
      return NextResponse.json(
        { message: 'Este email já está cadastrado' },
        { status: 400 }
      );
    }
    
    // Hash da senha
    console.log('[REGISTER] Gerando hash da senha');
    const hashedPassword = await hashPassword(password);
    console.log('[REGISTER] Hash gerado com sucesso');
    
    // Inserir usuário
    console.log('[REGISTER] Criando novo usuário no banco de dados');
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    
    console.log('[REGISTER] Usuário criado com sucesso:', {
      id: user.id,
      name: user.name,
      email: user.email
    });
    
    return NextResponse.json(
      { message: 'Usuário cadastrado com sucesso' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[REGISTER] Erro crítico durante o registro:', error);
    
    // Log mais detalhado para erros de Prisma
    if (error.code) {
      console.error('[REGISTER] Código de erro Prisma:', error.code);
      console.error('[REGISTER] Mensagem de erro Prisma:', error.message);
      console.error('[REGISTER] Meta informações:', error.meta);
    }
    
    return NextResponse.json(
      { message: 'Erro ao processar seu cadastro', error: error.message || 'Erro desconhecido' },
      { status: 500 }
    );
  }
}