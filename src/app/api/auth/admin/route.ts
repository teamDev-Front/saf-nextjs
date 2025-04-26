// app/api/auth/admin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const response = await adminMiddleware(req);
  
  if (response) {
    return response;
  }
  
  return NextResponse.json({ message: 'Authorized as admin' });
}