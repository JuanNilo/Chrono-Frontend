import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { medicId, date, shifts } = await request.json();

  // Aquí puedes implementar la lógica para guardar los cambios en la base de datos
  console.log(`Saving shifts for medicId: ${medicId}`, date, shifts);
  
  return NextResponse.json({ success: true });
}
