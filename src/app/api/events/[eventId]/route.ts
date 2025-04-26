// app/api/events/[eventId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteParams = {
  params: {
    eventId: string;
  };
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.eventId;
    
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!event) {
      return NextResponse.json(
        { message: 'Evento não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('Erro ao buscar evento:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar evento' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const authResponse = await fetch('/api/auth/admin', {
      headers: {
        cookie: req.headers.get('cookie') || ''
      }
    });
    
    if (!authResponse.ok) {
      const error = await authResponse.json();
      return NextResponse.json(error, { status: authResponse.status });
    }
    
    const id = params.eventId;
    const { title, date, time, location, description, image_path, details } = await req.json();
    
    if (!title || !date || !location) {
      return NextResponse.json(
        { message: 'Título, data e local são obrigatórios' },
        { status: 400 }
      );
    }
    
    await prisma.event.update({
      where: { id: parseInt(id) },
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
    
    return NextResponse.json({ message: 'Evento atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar evento' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const authResponse = await fetch('/api/auth/admin', {
      headers: {
        cookie: req.headers.get('cookie') || ''
      }
    });
    
    if (!authResponse.ok) {
      const error = await authResponse.json();
      return NextResponse.json(error, { status: authResponse.status });
    }
    
    const id = params.eventId;
    
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!event) {
      return NextResponse.json(
        { message: 'Evento não encontrado' },
        { status: 404 }
      );
    }
    
    await prisma.comment.deleteMany({
      where: { eventId: parseInt(id) }
    });
    
    await prisma.event.delete({
      where: { id: parseInt(id) }
    });
    
    return NextResponse.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    return NextResponse.json(
      { message: 'Erro ao excluir evento' },
      { status: 500 }
    );
  }
}