import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Hardcoded Taurus event data with a future date
    // No database query, just return the hardcoded event
    return NextResponse.json({
      id: 3, // ID of the Taurus event
      date: "2025-06-14T10:00:00.000Z", // ISO format date
      title: "Taurus Armwrestling Cup",
      location: "Rock City, Spitalweidstrasse 2, 4665 Offtringen",
      image_path: "/assets/images/taurus-armwrestling-cup.jpg"
    });
  } catch (error) {
    console.error('Erro ao retornar evento Taurus:', error);
    return NextResponse.json(null, { status: 500 });
  }
}