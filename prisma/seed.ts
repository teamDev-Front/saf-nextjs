import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get the current date
    const currentDate = new Date();
    
    // Find the next upcoming event (closest future date)
    const nextEvent = await prisma.event.findFirst({
      where: {
        date: {
          gt: currentDate // Greater than current date
        }
      },
      orderBy: {
        date: 'asc' // Sort by date ascending to get the closest
      }
    });
    
    // If no future events found, return null
    if (!nextEvent) {
      return NextResponse.json(null);
    }
    
    // Return the next event with proper ISO date format
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