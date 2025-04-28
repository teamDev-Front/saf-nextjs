import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar especificamente o evento Taurus Armwrestling Cup em 14 de junho de 2025
    const taurusEvent = await prisma.event.findFirst({
      where: {
        title: "Taurus Armwrestling Cup",
        date: {
          gte: new Date("2025-06-14T00:00:00Z"),
          lt: new Date("2025-06-15T00:00:00Z")
        }
      }
    });

    // Retornar o evento Taurus se encontrado
    if (taurusEvent) {
      return NextResponse.json({
        date: taurusEvent.date,
        title: taurusEvent.title,
        location: taurusEvent.location
      });
    }

    // Se o evento Taurus não for encontrado por algum motivo, usar a lógica original
    // para encontrar o próximo evento
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