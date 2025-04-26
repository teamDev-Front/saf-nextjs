// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar eventos' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verificar se o usuário é administrador
    const authResponse = await fetch('/api/auth/admin', {
      headers: {
        cookie: req.headers.get('cookie') || ''
      }
    });
    
    if (!authResponse.ok) {
      const error = await authResponse.json();
      return NextResponse.json(error, { status: authResponse.status });
    }
    
    const { title, date, time, location, description, image_path, details } = await req.json();
    
    // Validação básica
    if (!title || !date || !location) {
      return NextResponse.json(
        { message: 'Título, data e local são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Inserir evento
    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        time,
        location,
        description,
        image_path,
        details
      }
    });
    
    return NextResponse.json({ 
      message: 'Evento criado com sucesso',
      eventId: event.id
    }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json(
      { message: 'Erro ao criar evento' },
      { status: 500 }
    );
  }
}