import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Hardcoded date for Taurus Armwrestling Cup on June 14, 2025
    // Note: We're using a string that will be properly parsed on both server and client
    const targetDate = "2025-06-14T10:00:00.000Z";
    
    // Buscar especificamente o evento Taurus
    const taurusEvent = await prisma.event.findFirst({
      where: {
        title: "Taurus Armwrestling Cup"
      }
    });

    if (taurusEvent) {
      // Override the date to ensure it's in the future
      // This ensures the countdown will work correctly
      return NextResponse.json({
        id: taurusEvent.id,
        date: targetDate,
        title: taurusEvent.title,
        location: taurusEvent.location,
        image_path: taurusEvent.image_path
      });
    }

    // Fallback to any future event if Taurus isn't found
    const nextEvent = await prisma.event.findFirst({
      where: {
        date: {
          gt: new Date()
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    if (!nextEvent) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: nextEvent.id,
      date: nextEvent.date,
      title: nextEvent.title,
      location: nextEvent.location,
      image_path: nextEvent.image_path
    });
  } catch (error) {
    console.error('Erro ao buscar próximo evento:', error);
    return NextResponse.json(null, { status: 500 });
  }
}