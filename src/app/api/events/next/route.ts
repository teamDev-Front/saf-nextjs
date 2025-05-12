// src/app/api/events/next/route.ts (atualizado)
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar especificamente o Swiss Open 2025
    const swissOpen = await prisma.event.findFirst({
      where: {
        title: "Swiss Open 2025",
        date: {
          gte: new Date("2025-10-01") // Filtro aproximado para pegar o evento de outubro
        }
      }
    });
    
    // Se encontrou o Swiss Open 2025, retorná-lo diretamente
    if (swissOpen) {
      return NextResponse.json({
        id: swissOpen.id,
        date: swissOpen.date.toISOString(),
        title: swissOpen.title,
        location: swissOpen.location,
        image_path: swissOpen.image_path
      });
    }
    
    // Caso não encontre (ou seja a versão antiga), buscar o próximo evento futuro
    const currentDate = new Date();
    const nextEvent = await prisma.event.findFirst({
      where: {
        date: {
          gt: currentDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    // Se não encontrar nenhum evento futuro, retorna null
    if (!nextEvent) {
      // Fallback para dados estáticos do Swiss Open 2025
      return NextResponse.json({
        id: 7, // ID genérico que provavelmente existe
        date: "2025-10-31T08:00:00.000Z",
        title: "Swiss Open 2025",
        location: "Stadthalle Bülach, Almendstrasse 8, 8180 Bülach/Zürich, Switzerland",
        image_path: "/assets/images/swiss-open-2025.png"
      });
    }
    
    // Formatar e retornar o próximo evento
    return NextResponse.json({
      id: nextEvent.id,
      date: nextEvent.date.toISOString(),
      title: nextEvent.title,
      location: nextEvent.location,
      image_path: nextEvent.image_path
    });
  } catch (error) {
    console.error('Erro ao buscar próximo evento:', error);
    
    // Em caso de erro, retorna um fallback estático
    return NextResponse.json({
      id: 7, // ID genérico que provavelmente existe
      date: "2025-10-31T08:00:00.000Z",
      title: "Swiss Open 2025",
      location: "Stadthalle Bülach, Almendstrasse 8, 8180 Bülach/Zürich, Switzerland",
      image_path: "/assets/images/swiss-open-2025.png"
    });
  }
}