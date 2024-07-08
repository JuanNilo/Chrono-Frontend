import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const specialtyId = searchParams.get('specialtyId');

  const medics = [
    { id: 1, name: 'Dr. Juan Pérez', specialtyId: 1 },
    { id: 2, name: 'Dra. Maria López', specialtyId: 2 },
    { id: 3, name: 'Dr. Pedro González', specialtyId: 3 },
  ].filter(medic => medic.specialtyId === Number(specialtyId));
  
  return NextResponse.json({ medics });
}
