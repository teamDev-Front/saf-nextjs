import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obter a data atual
    const currentDate = new Date();
    
    // Buscar o próximo evento futuro (mais próximo)
    const nextEvent = await prisma.event.findFirst({
      where: {
        date: {
          gt: currentDate // Data maior que a atual
        }
      },
      orderBy: {
        date: 'asc' // Ordenar por data ascendente para obter o mais próximo
      }
    });
    
    // Se não encontrar eventos futuros, retornar null
    if (!nextEvent) {
      return NextResponse.json(null);
    }
    
    // Retornar o próximo evento com formato ISO para a data
    return NextResponse.json({
      id: nextEvent.id,
      date: nextEvent.date.toISOString(),
      title: nextEvent.title,
      location: nextEvent.location,
      image_path: nextEvent.image_path
    });
  } catch (error) {
    console.error('Erro ao buscar próximo evento:', error);
    return NextResponse.json(null, { status: 500 });
  }
}