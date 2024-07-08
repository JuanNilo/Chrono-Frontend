import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const specialties = [
    { id: 1, name: 'Cardiología' },
    { id: 2, name: 'Neurología' },
    { id: 3, name: 'Pediatría' },
  ];
  return NextResponse.json({ specialties });
}
