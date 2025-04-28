import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar o próximo evento futuro, ordenado pela data mais próxima
    const nextEvent = await prisma.event.findFirst({
      where: {
        date: {
          gt: new Date() // Maior que a data atual
        }
      },
      orderBy: {
        date: 'asc' // Ordenar do mais próximo para o mais distante
      }
    });

    if (!nextEvent) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      date: nextEvent.date,
      title: nextEvent.title,
      location: nextEvent.location
    });
  } catch (error) {
    console.error('Erro ao buscar próximo evento:', error);
    return NextResponse.json(null, { status: 500 });
  }
}